import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import connectDB from '../mysql';

export interface IMessage {
  id?: number;
  roomId: string;
  senderId: string;
  senderName: string;
  isStaff: boolean;
  message: string;
  timestamp: Date;
  read: boolean;
}

export class MessageModel {
  private static pool: Pool | null = null;

  private static async getPool(): Promise<Pool> {
    if (!this.pool) {
      this.pool = await connectDB();
    }
    return this.pool;
  }

  static async createTable(): Promise<void> {
    const pool = await this.getPool();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        roomId VARCHAR(255) NOT NULL,
        senderId VARCHAR(255) NOT NULL,
        senderName VARCHAR(255) NOT NULL,
        isStaff BOOLEAN DEFAULT FALSE,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`read\` BOOLEAN DEFAULT FALSE,
        INDEX idx_roomId (roomId),
        INDEX idx_roomId_timestamp (roomId, timestamp DESC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.execute(createTableQuery);
  }

  static async create(messageData: Omit<IMessage, 'id'>): Promise<IMessage> {
    const pool = await this.getPool();
    const query = `
      INSERT INTO messages (roomId, senderId, senderName, isStaff, message, timestamp, \`read\`)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      messageData.roomId,
      messageData.senderId,
      messageData.senderName,
      messageData.isStaff,
      messageData.message,
      messageData.timestamp,
      messageData.read,
    ]);

    return {
      id: result.insertId,
      ...messageData,
    };
  }

  static async find(roomId: string, limit: number = 50): Promise<IMessage[]> {
    const pool = await this.getPool();
    const query = `
      SELECT * FROM messages
      WHERE roomId = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [roomId, limit]);
    return rows.map(row => ({
      id: row.id,
      roomId: row.roomId,
      senderId: row.senderId,
      senderName: row.senderName,
      isStaff: Boolean(row.isStaff),
      message: row.message,
      timestamp: new Date(row.timestamp),
      read: Boolean(row.read),
    })).reverse();
  }

  static async findAll(limit: number = 100): Promise<IMessage[]> {
    const pool = await this.getPool();
    const query = `
      SELECT * FROM messages
      ORDER BY timestamp DESC
      LIMIT ?
    `;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [limit]);
    return rows.map(row => ({
      id: row.id,
      roomId: row.roomId,
      senderId: row.senderId,
      senderName: row.senderName,
      isStaff: Boolean(row.isStaff),
      message: row.message,
      timestamp: new Date(row.timestamp),
      read: Boolean(row.read),
    }));
  }

  static async markAsRead(roomId: string): Promise<void> {
    const pool = await this.getPool();
    const query = `
      UPDATE messages
      SET \`read\` = TRUE
      WHERE roomId = ? AND \`read\` = FALSE
    `;
    await pool.execute(query, [roomId]);
  }
}

export default MessageModel;
