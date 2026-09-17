import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  industry: text("industry").notNull(), // real-estate | jewellery | perfume | food
  duration: text("duration").notNull(), // 1w | 2w | 1m
  postCount: integer("post_count").notNull(),
  brandName: text("brand_name"),
  reference: text("reference"),
  seed: integer("seed").notNull(),
  userId: text("user_id"),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  planId: uuid("plan_id")
    .references(() => plans.id, { onDelete: "cascade" })
    .notNull(),
  position: integer("position").notNull(),
  isoDate: text("iso_date").notNull(),
  dayLabel: text("day_label").notNull(),
  timeLabel: text("time_label").notNull(),
  pillar: text("pillar").notNull(),
  category: text("category").notNull(),
  caption: text("caption").notNull(),
  visualDirection: text("visual_direction").notNull(),
  hashtags: text("hashtags").array().notNull(),
});

export type Plan = typeof plans.$inferSelect;
export type Post = typeof posts.$inferSelect;
