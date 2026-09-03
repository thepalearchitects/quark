import { pgTable, text, boolean, integer, json, timestamp } from 'drizzle-orm/pg-core'
import type { FileNode } from '@/lib/types'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  clerkId: text('clerk_id').unique(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  plan: text('plan', { enum: ['free', 'paid'] }).notNull().default('free'),
  publishedCount: integer('published_count').notNull().default(0),
  maxPublished: integer('max_published').notNull().default(3),
  emailVerified: boolean('email_verified').notNull().default(false),
  role: text('role', { enum: ['user', 'moderator', 'admin'] }).notNull().default('user'),
  suspended: boolean('suspended').notNull().default(false),
  bio: text('bio'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  files: json('files').$type<FileNode[]>().notNull().default([]),
  dependencies: json('dependencies').$type<Record<string, string>>().notNull().default({}),
  visibility: text('visibility', { enum: ['private', 'public', 'unlisted'] }).notNull().default('private'),
  tags: text('tags').array().notNull().default([]),
  forksCount: integer('forks_count').notNull().default(0),
  viewsCount: integer('views_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
})

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const reports = pgTable('reports', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  reporterId: text('reporter_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  reason: text('reason').notNull(),
  status: text('status', { enum: ['pending', 'reviewed', 'dismissed'] }).notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['fork', 'comment', 'billing', 'system'] }).notNull(),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  link: text('link'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const adminSettings = pgTable('admin_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
