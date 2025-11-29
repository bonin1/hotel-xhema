import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials
const ADMIN_USERS = [
  {
    username: 'Alban',
    passwordHash: '', // Will be generated on first login attempt
    plainPassword: 'hotelxhema1111!',
  },
  {
    username: 'Flutura',
    passwordHash: '', // Will be generated on first login attempt
    plainPassword: 'hotelxhema1111!',
  },
];

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'hotel-xhema-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = ADMIN_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // For simplicity, directly compare passwords
    // In production, you would hash the password and compare hashes
    if (password !== user.plainPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: user.username,
        role: 'admin',
      },
      JWT_SECRET,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Create response with token in cookie
    const response = NextResponse.json(
      {
        success: true,
        username: user.username,
        token,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for security
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
