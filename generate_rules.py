import yaml
import os
import json
import re
import shutil

# -----------------------------
# Paths
# -----------------------------
script_dir = os.path.dirname(os.path.abspath(__file__))
business_file = os.path.join(script_dir, "business.yaml")
rules_folder = os.path.join(script_dir, ".cursor/rules/")
templates_folder = os.path.join(script_dir, ".cursor/templates/")

# -----------------------------
# Load business YAML
# -----------------------------
try:
    with open(business_file, "r") as f:
        business = yaml.safe_load(f)
    print(f"✅ Loaded business data from {business_file}")
except FileNotFoundError:
    print(f"❌ Error: {business_file} not found!")
    exit(1)
except Exception as e:
    print(f"❌ Error loading {business_file}: {e}")
    exit(1)

# -----------------------------
# Helper functions
# -----------------------------
def render_value(value, placeholder=None):
    """Converts YAML values to string for template replacement"""
    if isinstance(value, list):
        # JSON array for *_ARRAY or when used in JSON context
        if placeholder and (placeholder.endswith("_ARRAY") or placeholder in ["BLOG_TOPICS", "SERVICES", "LOCATIONS"]):
            return json.dumps(value, indent=2)
        # Markdown list for *_MD
        elif placeholder and placeholder.endswith("_MD"):
            # Handle both string and dict items safely
            items = []
            for item in value:
                if isinstance(item, dict):
                    # For location dictionaries, format as CITY-STATE
                    if 'CITY' in item or 'STATE' in item:
                        city = item.get('CITY', '')
                        state = item.get('STATE', '')
                        if city and state:
                            items.append(f"{city}-{state}")
                        elif city:
                            items.append(city)
                        elif state:
                            items.append(state)
                        else:
                            items.append(str(item))
                    else:
                        items.append(str(item))
                else:
                    items.append(str(item))
            return "\n- " + "\n- ".join(items)
        # Simple comma list otherwise
        elif all(isinstance(i, dict) for i in value):
            items = []
            for i in value:
                city = i.get('CITY', '')
                state = i.get('STATE', '')
                if city and state:
                    items.append(f"{city}-{state}")
                elif city:
                    items.append(city)
                elif state:
                    items.append(state)
                else:
                    items.append(str(i))
            return ", ".join(items)
        else:
            # Handle mixed types safely
            return ", ".join(str(i) for i in value)
    elif isinstance(value, dict):
        return json.dumps(value, indent=2)
    else:
        return str(value)

def render_supporting_topics(topics):
    """Converts supporting topics dict into Markdown"""
    md = ""
    for pillar, subs in topics.items():
        md += f"## {pillar} Supporting Pages\n\n"
        for s in subs:
            md += f"- {s}\n"
        md += "\n"
    return md

def get_nested_value(data, key_path):
    """Get nested dictionary values using dot notation (e.g., CONTACT.PHONE)"""
    keys = key_path.split('.')
    value = data
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value

def create_missing_placeholders(business_data):
    """Create missing placeholders from existing data"""
    placeholders = {}
    
    # Map existing data to expected placeholders
    placeholders['BUSINESS_NAME'] = business_data.get('BUSINESS_NAME', business_data.get('SITE_NAME', ''))
    placeholders['PRIMARY_KEYWORD'] = business_data.get('PRIMARY_KEYWORD', 'Landscaping')
    placeholders['WEBSITE_URL'] = business_data.get('WEBSITE_URL', business_data.get('BASE_URL', ''))
    
    # Handle locations - use existing LOCATIONS_MD if available, otherwise generate from LOCATIONS
    if 'LOCATIONS_MD' in business_data:
        placeholders['LOCATIONS_MD'] = render_value(business_data['LOCATIONS_MD'], 'LOCATIONS_MD')
    else:
        placeholders['LOCATIONS_MD'] = render_value(business_data.get('LOCATIONS', []), 'LOCATIONS_MD')
    
    # Handle services - use flattened lists if available
    # Check for CORE_SERVICES (new hierarchical structure)
    if 'CORE_SERVICES' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['CORE_SERVICES'], 'SERVICES_MD')
        placeholders['SERVICES'] = business_data['CORE_SERVICES']
    elif 'SERVICES_MD' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['SERVICES_MD'], 'SERVICES_MD')
    else:
        # Handle old format (list of strings) or new format (list of dicts)
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract service names
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_MD'] = render_value(service_names, 'SERVICES_MD')
            placeholders['SERVICES'] = service_names
        else:
            # Old format - simple list
            placeholders['SERVICES_MD'] = render_value(services, 'SERVICES_MD')
            placeholders['SERVICES'] = services
    
    placeholders['CTA_TEXT'] = business_data.get('CTA_TEXT', 'Contact us today for a free consultation!')
    
    # Meta information mapping
    meta = business_data.get('META', {})
    placeholders['META_TITLE'] = meta.get('title', '')
    placeholders['META_DESCRIPTION'] = meta.get('description', '')
    placeholders['KEYWORDS_MD'] = render_value([meta.get('keywords', '')], 'KEYWORDS_MD')
    
    # Page-specific placeholders (these should be filled per-page, but provide defaults)
    placeholders['PAGE_TITLE'] = business_data.get('PAGE_TITLE', '')
    placeholders['PAGE_META_DESCRIPTION'] = business_data.get('PAGE_META_DESCRIPTION', '')
    placeholders['PAGE_KEYWORDS_MD'] = render_value(business_data.get('PAGE_KEYWORDS', []), 'PAGE_KEYWORDS_MD')
    placeholders['PAGE_URL_SLUG'] = business_data.get('PAGE_URL_SLUG', '')
    placeholders['PAGE_CONTENT'] = business_data.get('PAGE_CONTENT', '')
    
    # Create service URLs - use flattened URLs if available
    if 'CORE_SERVICES_URLS' in business_data:
        service_urls = business_data['CORE_SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    elif 'SERVICES_URLS' in business_data:
        service_urls = business_data['SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    else:
        # Generate from SERVICES
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract URLs
            service_urls = [s.get('URL', '') for s in services]
        else:
            # Old format - generate from service names
            service_urls = [f"/{service.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('&', 'and')}/" for service in services]
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    
    # Create blog links
    blog_topics = business_data.get('BLOG_TOPICS', [])
    blog_links = [f"/blog/{topic.lower().replace(' ', '-').replace(',', '').replace('&', 'and')}/" for topic in blog_topics]
    placeholders['BLOG_LINKS_MD'] = render_value(blog_links, 'BLOG_LINKS_MD')
    
    # Contact info - handle both uppercase and lowercase keys
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', contact.get('phone', ''))
    email = contact.get('EMAIL', contact.get('email', ''))
    placeholders['CONTACT_MD'] = business_data.get('CONTACT_MD', f"Phone: {phone} | Email: {email}")
    
    # Arrays for schema
    placeholders['LOCATIONS_ARRAY'] = business_data.get('LOCATIONS_ARRAY', business_data.get('LOCATIONS', []))
    
    # Handle SERVICES_ARRAY - use flattened list if available
    if 'ALL_SERVICES' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['ALL_SERVICES']
    elif 'SERVICES_ARRAY' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['SERVICES_ARRAY']
    else:
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # Extract service names from hierarchical structure
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_ARRAY'] = service_names
        else:
            placeholders['SERVICES_ARRAY'] = services
    
    # Social media profiles
    social_media = business_data.get('SOCIAL_MEDIA', {})
    social_profiles = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            social_profiles.append(data['URL'])
        elif isinstance(data, str) and data:
            social_profiles.append(data)
    placeholders['SOCIAL_PROFILES_ARRAY'] = business_data.get('SOCIAL_PROFILES_ARRAY', social_profiles)
    
    # Area served and language
    locations = business_data.get('LOCATIONS', [])
    if locations and isinstance(locations[0], dict):
        # Handle dictionary locations (CITY-STATE format)
        area_served = []
        for loc in locations:
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            if city and state:
                area_served.append(f"{city}, {state}")
            elif city:
                area_served.append(city)
            elif state:
                area_served.append(state)
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(area_served))
    else:
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(str(loc) for loc in locations))
    
    placeholders['AVAILABLE_LANGUAGE'] = business_data.get('AVAILABLE_LANGUAGE', 'English')
    
    return placeholders


def update_robots_txt(business_data):
    """Update robots.txt with current business URL"""
    robots_path = os.path.join(script_dir, "public/robots.txt")
    website_url = business_data.get('WEBSITE_URL', 'https://yourbusiness.com')
    
    robots_content = f"""User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /
Allow: /about/
Allow: /contact/
Allow: /services/
Allow: /blog/

# Sitemap
Sitemap: {website_url}/sitemap.xml

# Crawl delay
Crawl-delay: 1
"""
    
    with open(robots_path, "w", encoding="utf-8") as f:
        f.write(robots_content)
    
    print(f"✅ Updated: {robots_path}")

# -----------------------------
# Data Generation Functions
# -----------------------------

def generate_ai_scrape_data(business_data):
    """Generate ai-scrape-data.json from business.yaml"""
    output_path = os.path.join(script_dir, "public/ai-scrape-data.json")
    
    # Get meta info
    meta = business_data.get('META', {})
    contact = business_data.get('CONTACT', {})
    
    # Get social media URLs
    social_media = business_data.get('SOCIAL_MEDIA', {})
    social_links = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            social_links.append(data['URL'])
    
    # Get services - use ALL_SERVICES if available
    services = business_data.get('ALL_SERVICES', [])
    if not services:
        # Fallback to extracting from SERVICES hierarchy
        services_data = business_data.get('SERVICES', [])
        if services_data and isinstance(services_data[0], dict):
            for service in services_data:
                services.append(service.get('NAME', ''))
                for sub in service.get('SUB_SERVICES', []):
                    services.append(sub.get('NAME', ''))
    
    # Get locations
    locations = business_data.get('LOCATIONS_ARRAY', [])
    
    # Build service pages
    core_services = business_data.get('CORE_SERVICES', [])
    core_urls = business_data.get('CORE_SERVICES_URLS', [])
    service_pages = []
    for i, service in enumerate(core_services):
        url = core_urls[i] if i < len(core_urls) else f"/{service.lower().replace(' ', '-')}/"
        service_pages.append({
            "path": url,
            "title": f"{service} Services in {', '.join(locations[:4])}",
            "description": f"Professional {service} services in {', '.join(locations[:4])}. Expert craftsmanship and {business_data.get('CTA_TEXT', 'Contact us today!')}",
            "type": "service"
        })
    
    # Build location pages
    location_pages = []
    locations_md = business_data.get('LOCATIONS_MD', [])
    for i, loc in enumerate(locations):
        slug = locations_md[i] if i < len(locations_md) else f"/{loc.lower().replace(', ', '-').replace(' ', '-')}/"
        location_pages.append({
            "path": slug,
            "title": f"{business_data.get('BUSINESS_NAME', 'Our Company')} in {loc}",
            "description": f"Professional {', '.join(core_services[:3]).lower()} services in {loc}",
            "type": "location"
        })
    
    ai_scrape_data = {
        "website_info": {
            "name": business_data.get('BUSINESS_NAME', 'Our Company'),
            "url": business_data.get('WEBSITE_URL', 'https://example.com'),
            "description": meta.get('description', ''),
            "keywords": meta.get('keywords', ''),
            "last_updated": "2024-01-01T00:00:00Z"
        },
        "services": services,
        "locations": locations,
        "contact": {
            "address": contact.get('ADDRESS', ''),
            "phone": contact.get('PHONE', ''),
            "email": contact.get('EMAIL', '')
        },
        "social_links": social_links,
        "pages": [
            {
                "path": "/",
                "title": meta.get('title', ''),
                "description": meta.get('description', ''),
                "type": "homepage"
            },
            {
                "path": "/about",
                "title": f"About {business_data.get('BUSINESS_NAME', 'Our Company')}",
                "description": f"Learn about our professional {business_data.get('PRIMARY_KEYWORD', 'services')} and expertise",
                "type": "about"
            },
            {
                "path": "/contact",
                "title": f"Contact {business_data.get('BUSINESS_NAME', 'Our Company')}",
                "description": f"Get in touch with our expert team for your {business_data.get('PRIMARY_KEYWORD', 'service')} needs",
                "type": "contact"
            }
        ],
        "service_pages": service_pages,
        "location_pages": location_pages[:10],  # Limit to first 10 for brevity
        "blog_topics": business_data.get('BLOG_TOPICS', []),
        "seo_data": {
            "primary_keyword": business_data.get('PRIMARY_KEYWORD', ''),
            "secondary_keywords": core_services[:5],
            "target_locations": locations,
            "business_type": business_data.get('CATEGORIES', {}).get('PRIMARY', 'Service Business'),
            "service_areas": locations
        }
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(ai_scrape_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_blog_posts(business_data):
    """Generate blog-posts.json stubs from business.yaml"""
    output_path = os.path.join(script_dir, "data/blog-posts.json")
    
    blog_topics = business_data.get('BLOG_TOPICS', [])
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Services')
    
    blog_posts = []
    all_tags = set()
    
    for i, topic in enumerate(blog_topics):
        slug = topic.lower().replace(' ', '-').replace(',', '')
        
        # Create tags for this post
        post_tags = [slug, primary_keyword.lower()]
        all_tags.update(post_tags)
        
        blog_posts.append({
            "id": slug,
            "slug": slug,
            "title": topic,
            "excerpt": f"Expert advice and tips about {topic.lower()}. Learn from our professional team's experience in the industry.",
            "content": f"# {topic}\n\nComprehensive guide to {topic.lower()}. Contact {business_name} for professional {primary_keyword.lower()}.\n\n[Content to be added]",
            "date": "2024-01-01",
            "publishedAt": "2024-01-01",
            "updatedAt": "2024-01-01",
            "author": {
                "name": business_name,
                "bio": f"Professional {primary_keyword.lower()} experts",
                "avatar": "/assets/config/placeholder-image.png"
            },
            "category": {
                "slug": primary_keyword.lower().replace(' ', '-'),
                "name": primary_keyword,
                "description": f"Tips and guides for {primary_keyword.lower()}"
            },
            "tags": post_tags,
            "image": {
                "url": "/assets/config/placeholder-image.png",
                "alt": topic,
                "width": 1200,
                "height": 630
            },
            "readTime": "5 min read",
            "featured": i == 0,
            "status": "published",
            "seo": {
                "metaTitle": f"{topic} | {business_name}",
                "metaDescription": f"Expert advice about {topic.lower()}. Professional {primary_keyword.lower()} tips and guides.",
                "keywords": f"{topic.lower()}, {primary_keyword.lower()}",
                "canonical": f"/blog/{slug}"
            }
        })
    
    # Create categories array (unique categories from all posts)
    categories = [
        {
            "slug": primary_keyword.lower().replace(' ', '-'),
            "name": primary_keyword,
            "description": f"Tips and guides for {primary_keyword.lower()}"
        }
    ]
    
    # Create output data with categories, tags, and blog posts
    output_data = {
        "categories": categories,
        "tags": sorted(list(all_tags)),
        "blogPosts": blog_posts
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_faqs(business_data):
    """Generate faq.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/faq.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS_ARRAY', [])
    service_areas = ', '.join(locations[:4]) if len(locations) > 4 else ', '.join(locations)
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', '')
    core_services = business_data.get('CORE_SERVICES', [])
    
    faqs = [
        {
            "id": 1,
            "category": "General",
            "question": "What areas do you serve?",
            "answer": f"We proudly serve {service_areas}, along with surrounding areas. Our professional services are available throughout these communities."
        },
        {
            "id": 2,
            "category": "General",
            "question": "How can I contact you?",
            "answer": f"You can reach us at {phone} or email us at {contact.get('EMAIL', '')}. We&apos;re available {business_data.get('HOURS', {}).get('MONDAY', '7 days a week')}."
        },
        {
            "id": 3,
            "category": "Services",
            "question": "What services do you offer?",
            "answer": f"We offer {', '.join(core_services)}. Contact us for a free consultation to discuss your specific needs."
        },
        {
            "id": 4,
            "category": "Services",
            "question": "Do you provide free estimates?",
            "answer": f"Yes, we provide completely free, no-obligation estimates for all our services. Contact us at {phone} to schedule your estimate."
        },
        {
            "id": 5,
            "category": "Pricing",
            "question": "How much do your services cost?",
            "answer": "Pricing varies depending on the scope of work, materials needed, and specific requirements. We provide transparent, upfront pricing with no hidden fees. Contact us for a free estimate."
        },
        {
            "id": 6,
            "category": "Scheduling",
            "question": "How quickly can you start a project?",
            "answer": f"We offer same-day service for emergency repairs. For installations and larger projects, we typically can schedule within a few days. Call {phone} to check current availability."
        }
    ]
    
    output_data = {"faqs": faqs}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_portfolio(business_data):
    """Generate portfolio.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/portfolio.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS', [])
    core_services = business_data.get('CORE_SERVICES', [])
    
    # Create sample projects for each core service
    projects = []
    project_id = 1
    
    for i, service in enumerate(core_services[:5]):  # Limit to 5 services
        # Get a city for this project
        city_data = locations[i % len(locations)] if locations else {"CITY": "Local Area", "STATE": "TX"}
        city = city_data.get('CITY', 'Local Area') if isinstance(city_data, dict) else city_data
        state = city_data.get('STATE', 'TX') if isinstance(city_data, dict) else 'TX'
        
        projects.append({
            "id": project_id,
            "title": f"Professional {service} Project",
            "category": service,
            "image": "/assets/config/placeholder-image.png",
            "date": "2024",
            "location": f"{city}, {state}",
            "description": f"Complete {service.lower()} with professional installation and quality materials.",
            "features": ["Professional Installation", "Quality Materials", "Expert Service", "Customer Satisfaction"],
            "client": "Residential Client" if i % 2 == 0 else "Commercial Client",
            "duration": "1-2 Days",
            "tags": [service, city, state]
        })
        project_id += 1
    
    # Add portfolio stats
    stats = {
        "totalProjects": 500,
        "happyClients": 450,
        "yearsExperience": 10,
        "averageRating": 4.9
    }
    
    output_data = {
        "stats": stats,
        "projects": projects
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_business_config(business_data):
    """Generate lib/business-config.ts from business.yaml"""
    config_path = os.path.join(script_dir, "lib/business-config.ts")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    website_url = business_data.get('WEBSITE_URL', 'https://example.com')
    logo_url = business_data.get('LOGO_URL', f'{website_url}/logo.png')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Services')
    cta_text = business_data.get('CTA_TEXT', 'Contact us today!')
    tone = business_data.get('TONE', 'Professional')
    
    # Categories
    categories = business_data.get('CATEGORIES', {})
    primary_category = categories.get('PRIMARY', 'Service Business')
    secondary_categories = categories.get('SECONDARY', [])
    
    # Services
    services = business_data.get('SERVICES', [])
    
    # Locations
    locations = business_data.get('LOCATIONS', [])
    
    # Contact
    contact = business_data.get('CONTACT', {})
    
    # Hours
    hours = business_data.get('HOURS', {})
    
    # Google Maps
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Social Media
    social_media = business_data.get('SOCIAL_MEDIA', {})
    
    # Blog Topics
    blog_topics = business_data.get('BLOG_TOPICS', [])
    
    # Meta
    meta = business_data.get('META', {})
    
    # Format services for TypeScript
    def format_service(service):
        if isinstance(service, dict):
            name = service.get('NAME', '')
            url = service.get('URL', '')
            sub_services = service.get('SUB_SERVICES', [])
            
            sub_services_str = ""
            if sub_services:
                sub_items = []
                for sub in sub_services:
                    sub_name = sub.get('NAME', '')
                    sub_url = sub.get('URL', '')
                    sub_items.append(f'      {{ name: "{sub_name}", url: "{sub_url}" }}')
                sub_services_str = f",\n    subServices: [\n" + ",\n".join(sub_items) + "\n    ]"
            
            return f'  {{\n    name: "{name}",\n    url: "{url}"{sub_services_str},\n  }}'
        return ''
    
    services_ts = ",\n".join([format_service(s) for s in services])
    
    # Format locations for TypeScript
    def format_location(loc):
        if isinstance(loc, dict):
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            url = loc.get('URL', f"/{city.lower().replace(' ', '-')}-{state.lower()}/")
            return f'  {{ city: "{city}", state: "{state}", url: "{url}" }}'
        return ''
    
    locations_ts = ",\n".join([format_location(loc) for loc in locations])
    
    # Format social media
    social_media_entries = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            url = data['URL']
            social_media_entries.append(f'  {platform.lower()}: "{url}"')
    social_media_ts = ",\n".join(social_media_entries)
    
    # Format secondary categories
    secondary_cat_str = ",\n    ".join([f'"{cat}"' for cat in secondary_categories])
    
    # Format blog topics
    blog_topics_str = ",\n  ".join([f'"{topic}"' for topic in blog_topics])
    
    # Generate the TypeScript file
    ts_content = f'''/**
 * Business Configuration - Single Source of Truth
 * This file is AUTO-GENERATED from business.yaml
 * Run `python generate_rules.py` to regenerate
 * DO NOT EDIT THIS FILE DIRECTLY - Edit business.yaml instead
 */

export interface ServiceItem {{
  name: string;
  url: string;
  subServices?: ServiceItem[];
}}

export interface Location {{
  city: string;
  state: string;
  url?: string;
}}

export interface ContactInfo {{
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  areaCode: string;
  phone: string;
  email: string;
  addressVisibility: 'HIDDEN' | 'VISIBLE';
}}

export interface SocialMedia {{
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  pinterest?: string;
  nextdoor?: string;
  yelp?: string;
  instagram?: string;
  youtube?: string;
}}

export interface GoogleMaps {{
  shortLink: string;
  fullUrl: string;
  embedCode: string;
  latitude: string;
  longitude: string;
}}

export interface BusinessHours {{
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}}

// ==========================================
// BUSINESS INFORMATION
// ==========================================
export const BUSINESS_INFO = {{
  name: "{business_name}",
  websiteUrl: "{website_url}",
  tone: "{tone}",
  logoUrl: "{logo_url}",
  primaryKeyword: "{primary_keyword}",
  ctaText: "{cta_text}",
}} as const;

// ==========================================
// BUSINESS CATEGORIES
// ==========================================
export const BUSINESS_CATEGORIES = {{
  primary: "{primary_category}",
  secondary: [
    {secondary_cat_str}
  ],
}} as const;

// ==========================================
// CORE SERVICES
// ==========================================
export const CORE_SERVICES: ServiceItem[] = [
{services_ts}
];

// Flattened arrays for quick access
export const CORE_SERVICE_NAMES = CORE_SERVICES.map(s => s.name);
export const CORE_SERVICE_URLS = CORE_SERVICES.map(s => s.url);

// All services including sub-services
export const ALL_SERVICES = CORE_SERVICES.flatMap(service => [
  {{ name: service.name, url: service.url }},
  ...(service.subServices || []),
]);

// ==========================================
// SERVICE AREAS / LOCATIONS
// ==========================================
export const LOCATIONS: Location[] = [
{locations_ts}
];

// Helper to get top locations (first 4)
export const TOP_LOCATIONS = LOCATIONS.slice(0, 4);

// Helper to format location string
export const formatLocation = (location: Location): string => 
  `${{location.city}}, ${{location.state}}`;

// ==========================================
// CONTACT INFORMATION
// ==========================================
export const CONTACT: ContactInfo = {{
  address: "{contact.get('ADDRESS', '')}",
  street: "{contact.get('STREET', '')}",
  city: "{contact.get('CITY', '')}",
  state: "{contact.get('STATE', '')}",
  zip: "{contact.get('ZIP', '')}",
  areaCode: "{contact.get('AREA_CODE', '')}",
  phone: "{contact.get('PHONE', '')}",
  email: "{contact.get('EMAIL', '')}",
  addressVisibility: "{contact.get('ADDRESS_VISIBILITY', 'HIDDEN')}", // SAB (Service Area Business)
}};

// ==========================================
// BUSINESS HOURS
// ==========================================
export const BUSINESS_HOURS: BusinessHours = {{
  monday: "{hours.get('MONDAY', '9:00 AM - 5:00 PM')}",
  tuesday: "{hours.get('TUESDAY', '9:00 AM - 5:00 PM')}",
  wednesday: "{hours.get('WEDNESDAY', '9:00 AM - 5:00 PM')}",
  thursday: "{hours.get('THURSDAY', '9:00 AM - 5:00 PM')}",
  friday: "{hours.get('FRIDAY', '9:00 AM - 5:00 PM')}",
  saturday: "{hours.get('SATURDAY', '9:00 AM - 5:00 PM')}",
  sunday: "{hours.get('SUNDAY', 'Closed')}",
}};

// Helper to format business hours for schema
export const BUSINESS_HOURS_SCHEMA = "{business_data.get('BUSINESS_HOURS_SCHEMA', 'Mo-Fr 09:00-17:00')}";

// ==========================================
// GOOGLE MAPS
// ==========================================
export const GOOGLE_MAPS: GoogleMaps = {{
  shortLink: "{google_maps.get('SHORT_LINK', '')}",
  fullUrl: "{google_maps.get('FULL_URL', '')}",
  embedCode: `{google_maps.get('EMBED_CODE', '')}`,
  latitude: "{google_maps.get('LATITUDE', '0')}",
  longitude: "{google_maps.get('LONGITUDE', '0')}",
}};

// ==========================================
// SOCIAL MEDIA
// ==========================================
export const SOCIAL_MEDIA: SocialMedia = {{
{social_media_ts}
}};

// Filter out undefined social media links
export const ACTIVE_SOCIAL_MEDIA = Object.entries(SOCIAL_MEDIA)
  .filter(([_, url]) => url)
  .reduce((acc, [key, url]) => ({{ ...acc, [key]: url }}), {{}}) as SocialMedia;

// ==========================================
// BLOG TOPICS
// ==========================================
export const BLOG_TOPICS = [
  {blog_topics_str}
] as const;

// ==========================================
// META INFORMATION
// ==========================================
export const META = {{
  title: "{meta.get('title', '')}",
  description: "{meta.get('description', '')}",
  keywords: "{meta.get('keywords', '')}",
}} as const;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get services formatted for navigation/footer
 */
export const getServicesForNavigation = () => {{
  return CORE_SERVICES.map(service => ({{
    name: service.name,
    href: service.url,
  }}));
}};

/**
 * Get locations formatted for navigation/footer
 */
export const getLocationsForNavigation = (limit?: number) => {{
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(location => ({{
    name: formatLocation(location),
    href: location.url || `/${{location.city.toLowerCase().replace(/\\s+/g, '-')}}-${{location.state.toLowerCase()}}/`,
  }}));
}};

/**
 * Get company links for footer/navigation
 */
export const getCompanyLinks = () => [
  {{ name: "About Us", href: "/about/" }},
  {{ name: "Blog", href: "/blog/" }},
  {{ name: "Contact", href: "/contact/" }},
  {{ name: "Portfolio", href: "/portfolio/" }},
  {{ name: "Service Areas", href: "/service-areas/" }},
];

/**
 * Get legal links for footer
 */
export const getLegalLinks = () => [
  {{ name: "Privacy Policy", href: "/privacy-policy/" }},
  {{ name: "Terms & Conditions", href: "/terms/" }},
];
'''
    
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"✅ Generated: {config_path}")

def generate_seo_config(business_data):
    """Update siteConfig and seoConfigs in lib/seo-config.ts from business.yaml"""
    config_path = os.path.join(script_dir, "lib/seo-config.ts")
    
    # Read existing file
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            file_content = f.read()
    except FileNotFoundError:
        print(f"⚠️  Warning: {config_path} not found, skipping update")
        return
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    website_url = business_data.get('WEBSITE_URL', 'https://example.com')
    meta = business_data.get('META', {})
    contact = business_data.get('CONTACT', {})
    social_media = business_data.get('SOCIAL_MEDIA', {})
    core_services = business_data.get('CORE_SERVICES', [])
    hours = business_data.get('HOURS', {})
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Format business hours
    monday_hours = hours.get('MONDAY', 'Monday - Friday: 9:00 AM - 6:00 PM')
    
    # Extract social media links
    facebook = social_media.get('FACEBOOK', {}).get('URL', '')
    twitter = social_media.get('TWITTER', {}).get('URL', '')
    linkedin = social_media.get('LINKEDIN', {}).get('URL', '')
    instagram = social_media.get('INSTAGRAM', {}).get('URL', '')
    youtube = social_media.get('YOUTUBE', {}).get('URL', '')
    pinterest = social_media.get('PINTEREST', {}).get('URL', '')
    nextdoor = social_media.get('NEXTDOOR', {}).get('URL', '')
    yelp = social_media.get('YELP', {}).get('URL', '')
    
    # Extract twitter handle
    twitter_handle = twitter.split('/')[-1] if twitter else business_name.lower().replace(' ', '')
    
    # Build social object with only existing links
    social_lines = []
    if facebook:
        social_lines.append(f'    facebook: "{facebook}",')
    if twitter:
        social_lines.append(f'    twitter: "{twitter}",')
        social_lines.append(f'    twitterHandle: "{twitter_handle}",')
    if instagram:
        social_lines.append(f'    instagram: "{instagram}",')
    if linkedin:
        social_lines.append(f'    linkedin: "{linkedin}",')
    if youtube:
        social_lines.append(f'    youtube: "{youtube}",')
    if pinterest:
        social_lines.append(f'    pinterest: "{pinterest}",')
    if nextdoor:
        social_lines.append(f'    nextdoor: "{nextdoor}",')
    if yelp:
        social_lines.append(f'    yelp: "{yelp}",')
    
    social_content = '\n'.join(social_lines).rstrip(',')  # Remove trailing comma from last item
    
    # Build new siteConfig
    new_site_config = f'''export const siteConfig: SiteConfig = {{
  name: "{business_name}",
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '{website_url}',
  description: "{meta.get('description', '')}",
  logo: "/assets/config/logo.png",
  favicon: "/assets/config/favicon.ico",
  themeColor: "#3B82F6",
  author: "{business_name}",
  copyright: "© 2024 {business_name}. All rights reserved.",
  social: {{
{social_content}
  }},
  contact: {{
    phone: "{contact.get('PHONE', '')}",
    email: "{contact.get('EMAIL', '')}",
    address: "{contact.get('STREET', contact.get('ADDRESS', ''))}",
    city: "{contact.get('CITY', '')}",
    state: "{contact.get('STATE', '')}",
    zipCode: "{contact.get('ZIP', '')}",
    country: "USA"
  }},
  businessHours: "{monday_hours}",
  services: {json.dumps(core_services)},
  coordinates: {{
    latitude: "{google_maps.get('LATITUDE', '0')}",
    longitude: "{google_maps.get('LONGITUDE', '0')}"
  }}
}};'''
    
    # Get locations for SEO
    locations = business_data.get('LOCATIONS_ARRAY', [])
    primary_cities = ', '.join(locations[:4]) if len(locations) >= 4 else ', '.join(locations)
    
    # Build new seoConfigs
    keywords_list = ', '.join([f'"{business_data.get("PRIMARY_KEYWORD", "")}"'] + [f'"{service.lower()}"' for service in core_services[:3]])
    
    new_seo_configs = f'''export const seoConfigs: Record<string, SEOConfig> = {{
  "/": {{
    title: "{meta.get('title', '')}",
    description: "{meta.get('description', '')}",
    keywords: [{keywords_list}],
    canonical: "{website_url}/",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image',
    geoRegion: "{contact.get('STATE', 'TX')}-US",
    geoPlacename: "{contact.get('CITY', '')}, {contact.get('STATE', 'TX')}"
  }},
  "/about": {{
    title: "About {business_name} | Professional {business_data.get('PRIMARY_KEYWORD', 'Services')}",
    description: "Learn about {business_name}, your trusted {business_data.get('PRIMARY_KEYWORD', 'service')} provider in {primary_cities}. Expert team with years of experience.",
    keywords: [{keywords_list}, "about us", "{business_name.lower()}"],
    canonical: "{website_url}/about",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }},
  "/contact": {{
    title: "Contact {business_name} | {contact.get('PHONE', '')}",
    description: "Contact {business_name} for professional {business_data.get('PRIMARY_KEYWORD', 'services').lower()} in {primary_cities}. Call {contact.get('PHONE', '')} or email us today!",
    keywords: ["contact", "get quote", "{business_data.get('PRIMARY_KEYWORD', '').lower()}", "{contact.get('CITY', '')}"],
    canonical: "{website_url}/contact",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }},
  "/services": {{
    title: "{business_data.get('PRIMARY_KEYWORD', 'Services')} | {business_name}",
    description: "Complete {business_data.get('PRIMARY_KEYWORD', 'services').lower()} including {', '.join(core_services[:3])} in {primary_cities}. Professional quality guaranteed.",
    keywords: [{keywords_list}],
    canonical: "{website_url}/services",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }},
  "/portfolio": {{
    title: "Portfolio | {business_name} Projects",
    description: "View our {business_data.get('PRIMARY_KEYWORD', 'service').lower()} portfolio. Quality projects across {primary_cities}. See our work and get inspired!",
    keywords: ["portfolio", "projects", "gallery", "{business_data.get('PRIMARY_KEYWORD', '').lower()}"],
    canonical: "{website_url}/portfolio",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }},
  "/service-areas": {{
    title: "Service Areas | {business_name}",
    description: "We serve {primary_cities} and surrounding areas. Professional {business_data.get('PRIMARY_KEYWORD', 'services').lower()} throughout the region.",
    keywords: ["service areas", "locations", "{contact.get('CITY', '')}", "{contact.get('STATE', 'TX')}"],
    canonical: "{website_url}/service-areas",
    ogImage: "{website_url}/og.png",
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }}
}};'''
    
    # Replace siteConfig using regex
    site_config_pattern = r'export const siteConfig: SiteConfig = \{[^}]*(?:\{[^}]*\}[^}]*)*\};'
    if re.search(site_config_pattern, file_content, re.DOTALL):
        file_content = re.sub(site_config_pattern, new_site_config, file_content, flags=re.DOTALL)
    else:
        print("⚠️  Warning: Could not find siteConfig pattern in file")
    
    # Replace seoConfigs using regex
    seo_configs_pattern = r'export const seoConfigs: Record<string, SEOConfig> = \{[^}]*(?:\{[^}]*\}[^}]*)*\};'
    if re.search(seo_configs_pattern, file_content, re.DOTALL):
        file_content = re.sub(seo_configs_pattern, new_seo_configs, file_content, flags=re.DOTALL)
    else:
        print("⚠️  Warning: Could not find seoConfigs pattern in file")
    
    # Write updated content back
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(file_content)
    
    print(f"✅ Updated: {config_path} (siteConfig & seoConfigs only)")

# -----------------------------
# Process all templates
# -----------------------------
templates_processed = 0

# Check if templates folder exists
if not os.path.exists(templates_folder):
    print(f"❌ Templates folder not found: {templates_folder}")
    print("Please ensure templates are in the correct location.")
    exit(1)

print(f"📁 Processing templates from: {templates_folder}")

for file_name in os.listdir(templates_folder):
    if not file_name.endswith(".template"):
        continue

    template_path = os.path.join(templates_folder, file_name)
    print(f"🔄 Processing: {file_name}")
    
    try:
        with open(template_path, "r", encoding="utf-8") as f:
            template = f.read()

        output_content = template

        # Handle numbered examples if present
        for i in range(1, 5):
            ph = f"EXAMPLE_{i}"
            if ph in output_content:
                ex_value = business.get("EXAMPLES", [])
                if len(ex_value) >= i:
                    output_content = output_content.replace(f"{{{{{ph}}}}}", ex_value[i-1])
                else:
                    output_content = output_content.replace(f"{{{{{ph}}}}}", "")

        # Create missing placeholders
        missing_placeholders = create_missing_placeholders(business)
        
        # Replace all other placeholders dynamically
        placeholders = re.findall(r"{{(.*?)}}", output_content)
        for ph in placeholders:
            # Handle nested dictionary access (e.g., CONTACT.PHONE)
            if '.' in ph:
                value = get_nested_value(business, ph)
                # Try lowercase version if not found
                if value is None:
                    keys = ph.split('.')
                    if len(keys) == 2:
                        parent_key = keys[0]
                        child_key = keys[1].lower()  # Try lowercase
                        if parent_key in business and isinstance(business[parent_key], dict):
                            value = business[parent_key].get(child_key)
            else:
                value = business.get(ph) or missing_placeholders.get(ph)
            
            if value is not None:
                rendered_value = render_value(value, ph)
                output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
            elif ph == "SUPPORTING_TOPICS_MD" and "SUPPORTING_TOPICS" in business:
                rendered_value = render_supporting_topics(business["SUPPORTING_TOPICS"])
                output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
            else:
                print(f"⚠️  Warning: Placeholder '{ph}' not found in business data")
                output_content = output_content.replace(f"{{{{{ph}}}}}", "")

        # Rule 1: Convert <a> tags to <Link> components
        output_content = re.sub(
            r'<a\s+([^>]*?)href=["\']([^"\']*)["\']([^>]*?)>([^<]*)</a>',
            r'<Link href="\2" \1\3>\4</Link>',
            output_content,
            flags=re.IGNORECASE | re.DOTALL
        )

        protected_content = []
        def protect_and_replace(match):
            protected_content.append(match.group(0))
            return f'__PROTECTED_{len(protected_content)-1}__'
        
        # Protect HTML tags and JSX expressions
        output_content = re.sub(r'<[^>]*>|{[^}]*}', protect_and_replace, output_content)
        
        # Replace quotes in remaining text
        output_content = output_content.replace("'", "&apos;")
        
        # Restore protected content
        for i, content in enumerate(protected_content):
            output_content = output_content.replace(f'__PROTECTED_{i}__', content)

        # Determine output file name and location
        if file_name.endswith(".mdc.template"):
            output_name = file_name.replace(".mdc.template", ".mdc")
            output_file = os.path.join(rules_folder, output_name)
        elif file_name.endswith(".json.template"):
            output_name = file_name.replace(".json.template", ".json")
            output_file = os.path.join(script_dir, "public", output_name)
        else:
            output_name = file_name.replace(".template", ".mdc")
            output_file = os.path.join(rules_folder, output_name)

        # Write output
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(output_content)

        # Validate JSON if it's a JSON file
        if output_file.endswith('.json'):
            try:
                with open(output_file, "r", encoding="utf-8") as f:
                    json.load(f)
                print(f"✅ Generated: {output_file} (valid JSON)")
            except json.JSONDecodeError as e:
                print(f"❌ Generated: {output_file} (INVALID JSON: {e})")
        else:
            print(f"✅ Generated: {output_file}")
        templates_processed += 1
        
    except Exception as e:
        print(f"❌ Error processing {file_name}: {e}")

# -----------------------------
# Update Public Files
# -----------------------------
print("\n🤖 Updating robots.txt...")
try:
    update_robots_txt(business)
except Exception as e:
    print(f"❌ Error updating robots.txt: {e}")

# -----------------------------
# Generate Data Files from business.yaml
# -----------------------------
print("\n📊 Generating data files from business.yaml...")
data_files_generated = 0

try:
    generate_ai_scrape_data(business)
    data_files_generated += 1
except Exception as e:
    print(f"❌ Error generating ai-scrape-data.json: {e}")

# SKIP: Blog posts are maintained manually
# try:
#     generate_blog_posts(business)
#     data_files_generated += 1
# except Exception as e:
#     print(f"❌ Error generating blog-posts.json: {e}")

try:
    generate_faqs(business)
    data_files_generated += 1
except Exception as e:
    print(f"❌ Error generating faq.json: {e}")

try:
    generate_portfolio(business)
    data_files_generated += 1
except Exception as e:
    print(f"❌ Error generating portfolio.json: {e}")

try:
    generate_business_config(business)
    data_files_generated += 1
except Exception as e:
    print(f"❌ Error generating business-config.ts: {e}")

try:
    generate_seo_config(business)
    data_files_generated += 1
except Exception as e:
    print(f"❌ Error generating seo-config.ts: {e}")

# Summary
print("\n" + "="*60)
print("📊 GENERATION SUMMARY")
print("="*60)

if templates_processed > 0:
    print(f"\n✅ Templates Processed: {templates_processed}")
    print(f"   📁 Rules location: {rules_folder}")
    print(f"   📁 Public files location: {os.path.join(script_dir, 'public/')}")

if data_files_generated > 0:
    print(f"\n✅ Data Files Generated: {data_files_generated}")
    print(f"   📁 Data location: {os.path.join(script_dir, 'data/')}")
    print(f"   📁 Public location: {os.path.join(script_dir, 'public/')}")

print("\n💡 All files are now data-driven from business.yaml!")
print("   - Update business.yaml to change content")
print("   - Re-run this script to regenerate all files")
print("\n📝 Manually maintained files (NOT auto-generated):")
print("   - data/services.json")
print("   - data/cities.json")
print("   - data/blog-posts.json")
print("\n" + "="*60)