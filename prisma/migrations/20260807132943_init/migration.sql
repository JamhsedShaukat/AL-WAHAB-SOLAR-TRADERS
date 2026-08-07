-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'suspended', 'deleted');

-- CreateEnum
CREATE TYPE "rate_basis" AS ENUM ('per_kwp', 'per_kw_ac', 'per_kwh_batt', 'flat', 'per_sqft', 'percent');

-- CreateEnum
CREATE TYPE "system_type" AS ENUM ('ongrid', 'hybrid', 'offgrid');

-- CreateEnum
CREATE TYPE "estimate_goal" AS ENUM ('cover_all', 'reduce_bill', 'fit_budget');

-- CreateEnum
CREATE TYPE "estimate_status" AS ENUM ('draft', 'completed', 'saved', 'survey_requested', 'surveyed', 'quoted', 'accepted', 'declined', 'expired', 'converted');

-- CreateEnum
CREATE TYPE "project_status" AS ENUM ('survey_requested', 'survey_scheduled', 'surveyed', 'quotation_issued', 'agreement_signed', 'procurement', 'installation', 'commissioning', 'net_metering', 'handover', 'completed', 'cancelled', 'on_hold');

-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('pending', 'in_progress', 'completed', 'skipped', 'blocked');

-- CreateEnum
CREATE TYPE "price_mode" AS ENUM ('fixed', 'from', 'on_request');

-- CreateEnum
CREATE TYPE "stock_status" AS ENUM ('in_stock', 'out_of_stock', 'preorder', 'discontinued');

-- CreateEnum
CREATE TYPE "publish_status" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password_hash" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Lahore',
    "area" TEXT,
    "address" TEXT,
    "language" TEXT NOT NULL DEFAULT 'en',
    "avatar_url" TEXT,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "marketing_optin" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "last_seen_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_system" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" UUID NOT NULL,
    "role_id" INTEGER NOT NULL,
    "assigned_by" UUID,
    "assigned_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "rate_cards" (
    "id" UUID NOT NULL,
    "version" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Lahore',
    "currency" TEXT NOT NULL DEFAULT 'PKR',
    "effective_from" DATE NOT NULL,
    "effective_to" DATE,
    "buffer_pct" DECIMAL(4,2) NOT NULL DEFAULT 6.0,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_card_items" (
    "id" UUID NOT NULL,
    "rate_card_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "label_en" TEXT NOT NULL,
    "label_ur" TEXT,
    "basis" "rate_basis" NOT NULL,
    "unit_rate" DECIMAL(12,2) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "applies_when" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "rate_card_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tiers" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "tagline_en" TEXT,
    "multiplier" DECIMAL(5,3) NOT NULL,
    "specs" JSONB NOT NULL,
    "warranty_note_en" TEXT,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER,

    CONSTRAINT "tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tariff_slabs" (
    "id" UUID NOT NULL,
    "disco" TEXT NOT NULL DEFAULT 'LESCO',
    "phase" TEXT NOT NULL DEFAULT 'any',
    "units_from" INTEGER NOT NULL,
    "units_to" INTEGER,
    "rate" DECIMAL(8,2) NOT NULL,
    "effective_from" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tariff_slabs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimates" (
    "id" UUID NOT NULL,
    "public_ref" TEXT NOT NULL,
    "user_id" UUID,
    "anon_token" TEXT,
    "status" "estimate_status" NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "parent_id" UUID,
    "monthly_units" INTEGER,
    "connection_phase" TEXT,
    "goal" "estimate_goal",
    "system_type" "system_type",
    "backup_loads" TEXT[],
    "backup_hours" INTEGER,
    "roof_type" TEXT,
    "roof_area_sqft" INTEGER,
    "structure_type" TEXT,
    "structure_quality" TEXT,
    "priority" TEXT,
    "budget_pkr" DECIMAL(12,2),
    "net_metering" BOOLEAN NOT NULL DEFAULT true,
    "area_name" TEXT,
    "install_address" TEXT,
    "tier_id" UUID,
    "system_size_kwp" DECIMAL(6,2),
    "inverter_kw" DECIMAL(6,2),
    "battery_kwh" DECIMAL(6,2),
    "panel_count" INTEGER,
    "panel_watt" INTEGER,
    "subtotal_pkr" DECIMAL(12,2),
    "price_low_pkr" DECIMAL(12,2),
    "price_high_pkr" DECIMAL(12,2),
    "monthly_units_gen" INTEGER,
    "monthly_saving_pkr" DECIMAL(12,2),
    "bill_coverage_pct" DECIMAL(5,2),
    "payback_years" DECIMAL(4,1),
    "co2_kg_year" INTEGER,
    "rate_card_id" UUID,
    "bill_file_path" TEXT,
    "ocr_confidence" DECIMAL(4,3),
    "locale" TEXT NOT NULL DEFAULT 'en',
    "utm" JSONB,
    "valid_until" DATE,
    "issued_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "estimates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate_inputs" (
    "estimate_id" UUID NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "estimate_inputs_pkey" PRIMARY KEY ("estimate_id")
);

-- CreateTable
CREATE TABLE "estimate_line_items" (
    "id" UUID NOT NULL,
    "estimate_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "label_en" TEXT NOT NULL,
    "label_ur" TEXT,
    "spec_en" TEXT,
    "spec_ur" TEXT,
    "quantity" DECIMAL(10,2),
    "unit" TEXT,
    "unit_rate" DECIMAL(12,2),
    "amount_pkr" DECIMAL(12,2) NOT NULL,
    "is_override" BOOLEAN NOT NULL DEFAULT false,
    "overridden_by" UUID,
    "sort_order" INTEGER,

    CONSTRAINT "estimate_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "public_ref" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "estimate_id" UUID,
    "status" "project_status" NOT NULL DEFAULT 'survey_requested',
    "title" TEXT,
    "system_size_kwp" DECIMAL(6,2),
    "system_type" "system_type",
    "tier_id" UUID,
    "contract_value_pkr" DECIMAL(12,2),
    "invoiced_pkr" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "collected_pkr" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "address" TEXT,
    "area_name" TEXT,
    "survey_date" DATE,
    "survey_window" TEXT,
    "start_date" DATE,
    "target_completion" DATE,
    "completed_at" TIMESTAMPTZ,
    "assigned_to" UUID,
    "crew_lead" UUID,
    "progress_pct" INTEGER NOT NULL DEFAULT 0,
    "cancel_reason" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phase_templates" (
    "id" SMALLINT NOT NULL,
    "key" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "duration_label_en" TEXT,
    "sort_order" INTEGER,
    "applies_when" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "phase_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_templates" (
    "id" SERIAL NOT NULL,
    "phase_key" TEXT,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "sort_order" INTEGER,

    CONSTRAINT "task_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_phases" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "key" TEXT,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "status" "task_status" NOT NULL DEFAULT 'pending',
    "sort_order" INTEGER,
    "started_at" TIMESTAMPTZ,
    "completed_at" TIMESTAMPTZ,

    CONSTRAINT "project_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tasks" (
    "id" UUID NOT NULL,
    "phase_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "status" "task_status" NOT NULL DEFAULT 'pending',
    "assigned_to" UUID,
    "due_date" DATE,
    "completed_at" TIMESTAMPTZ,
    "note" TEXT,
    "sort_order" INTEGER,

    CONSTRAINT "project_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_documents" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "kind" TEXT,
    "title" TEXT,
    "file_path" TEXT NOT NULL,
    "mime" TEXT,
    "size_bytes" BIGINT,
    "visible_to_customer" BOOLEAN NOT NULL DEFAULT true,
    "uploaded_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_payments" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "label" TEXT,
    "amount_pkr" DECIMAL(12,2) NOT NULL,
    "due_date" DATE,
    "paid_at" TIMESTAMPTZ,
    "method" TEXT,
    "reference" TEXT,
    "recorded_by" UUID,

    CONSTRAINT "project_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_updates" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "body_en" TEXT,
    "body_ur" TEXT,
    "photo_path" TEXT,
    "author_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL,
    "full_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "bill_range" TEXT,
    "area_name" TEXT,
    "message" TEXT,
    "source" TEXT,
    "utm" JSONB,
    "status" TEXT NOT NULL DEFAULT 'new',
    "assigned_to" UUID,
    "user_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "project_id" UUID,
    "rating" INTEGER,
    "body" TEXT,
    "area_name" TEXT,
    "system_label" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "moderated_by" UUID,
    "moderated_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title_en" TEXT,
    "title_ur" TEXT,
    "body_en" TEXT,
    "body_ur" TEXT,
    "link" TEXT,
    "read_at" TIMESTAMPTZ,
    "channel" TEXT[] DEFAULT ARRAY['in_app']::TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_templates" (
    "key" TEXT NOT NULL,
    "name" TEXT,
    "subject_en" TEXT,
    "subject_ur" TEXT,
    "body_en" TEXT,
    "body_ur" TEXT,
    "sms_en" TEXT,
    "sms_ur" TEXT,
    "channels" TEXT[] DEFAULT ARRAY['in_app', 'email']::TEXT[],
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "notification_templates_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "site_content" (
    "key" TEXT NOT NULL,
    "value_en" JSONB,
    "value_ur" JSONB,
    "updated_by" UUID,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_content_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "updated_by" UUID,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" BIGSERIAL NOT NULL,
    "actor_id" UUID,
    "actor_label" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" UUID,
    "meta" JSONB,
    "ip" INET,
    "user_agent" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "actor_id" UUID,
    "actor_email" TEXT,
    "actor_role" TEXT,
    "action" TEXT NOT NULL,
    "table_name" TEXT,
    "record_id" TEXT,
    "old_values" JSONB,
    "new_values" JSONB,
    "changed_fields" TEXT[],
    "ip" INET,
    "user_agent" TEXT,
    "request_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_sessions" (
    "id" UUID NOT NULL,
    "anon_id" TEXT NOT NULL,
    "user_id" UUID,
    "first_page" TEXT,
    "referrer" TEXT,
    "utm" JSONB,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "country" TEXT,
    "city" TEXT,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ,
    "pageviews" INTEGER NOT NULL DEFAULT 0,
    "is_bounce" BOOLEAN,

    CONSTRAINT "visitor_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" BIGSERIAL NOT NULL,
    "session_id" UUID,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "referrer" TEXT,
    "duration_ms" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_metrics" (
    "day" DATE NOT NULL,
    "visitors" INTEGER,
    "sessions" INTEGER,
    "pageviews" INTEGER,
    "bounce_rate" DECIMAL(5,2),
    "signups" INTEGER,
    "active_users" INTEGER,
    "estimates_started" INTEGER,
    "estimates_completed" INTEGER,
    "estimates_saved" INTEGER,
    "survey_requests" INTEGER,
    "projects_created" INTEGER,
    "projects_completed" INTEGER,
    "revenue_booked_pkr" DECIMAL(14,2),
    "revenue_collected_pkr" DECIMAL(14,2),

    CONSTRAINT "daily_metrics_pkey" PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "summary_en" TEXT,
    "body_en" TEXT,
    "icon" TEXT,
    "image_url" TEXT,
    "parent_id" UUID,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "website_url" TEXT,
    "summary_en" TEXT,
    "origin_country" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "sku" TEXT,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "summary_en" TEXT,
    "body_en" TEXT,
    "category_id" UUID NOT NULL,
    "brand_id" UUID,
    "specs" JSONB NOT NULL DEFAULT '{}',
    "price_mode" "price_mode" NOT NULL DEFAULT 'on_request',
    "price_pkr" DECIMAL(12,2),
    "compare_price_pkr" DECIMAL(12,2),
    "currency" TEXT NOT NULL DEFAULT 'PKR',
    "stock_status" "stock_status" NOT NULL DEFAULT 'in_stock',
    "warranty_months" INTEGER,
    "whatsapp_message" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "canonical_url" TEXT,
    "status" "publish_status" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMPTZ,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ur" TEXT,
    "summary_en" TEXT,
    "body_en" TEXT,
    "icon" TEXT,
    "price_mode" "price_mode" NOT NULL DEFAULT 'on_request',
    "price_from_pkr" DECIMAL(12,2),
    "price_unit" TEXT,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "publish_status" NOT NULL DEFAULT 'draft',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_status_created_at_idx" ON "users"("status", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "roles_key_key" ON "roles"("key");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_key_key" ON "permissions"("key");

-- CreateIndex
CREATE INDEX "rate_cards_is_active_effective_from_idx" ON "rate_cards"("is_active", "effective_from" DESC);

-- CreateIndex
CREATE INDEX "rate_card_items_rate_card_id_sort_order_idx" ON "rate_card_items"("rate_card_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "tiers_key_key" ON "tiers"("key");

-- CreateIndex
CREATE INDEX "tariff_slabs_disco_is_active_units_from_idx" ON "tariff_slabs"("disco", "is_active", "units_from");

-- CreateIndex
CREATE UNIQUE INDEX "estimates_public_ref_key" ON "estimates"("public_ref");

-- CreateIndex
CREATE INDEX "estimates_user_id_created_at_idx" ON "estimates"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "estimates_status_created_at_idx" ON "estimates"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "estimates_anon_token_idx" ON "estimates"("anon_token");

-- CreateIndex
CREATE INDEX "estimate_line_items_estimate_id_sort_order_idx" ON "estimate_line_items"("estimate_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "projects_public_ref_key" ON "projects"("public_ref");

-- CreateIndex
CREATE INDEX "projects_user_id_created_at_idx" ON "projects"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "projects_status_updated_at_idx" ON "projects"("status", "updated_at" DESC);

-- CreateIndex
CREATE INDEX "projects_assigned_to_idx" ON "projects"("assigned_to");

-- CreateIndex
CREATE UNIQUE INDEX "phase_templates_key_key" ON "phase_templates"("key");

-- CreateIndex
CREATE INDEX "project_phases_project_id_sort_order_idx" ON "project_phases"("project_id", "sort_order");

-- CreateIndex
CREATE INDEX "project_tasks_project_id_status_idx" ON "project_tasks"("project_id", "status");

-- CreateIndex
CREATE INDEX "project_documents_project_id_kind_idx" ON "project_documents"("project_id", "kind");

-- CreateIndex
CREATE INDEX "project_payments_project_id_idx" ON "project_payments"("project_id");

-- CreateIndex
CREATE INDEX "project_updates_project_id_created_at_idx" ON "project_updates"("project_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "leads_status_created_at_idx" ON "leads"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "reviews_status_created_at_idx" ON "reviews"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "notifications_user_id_read_at_idx" ON "notifications"("user_id", "read_at");

-- CreateIndex
CREATE INDEX "settings_category_idx" ON "settings"("category");

-- CreateIndex
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs"("created_at" DESC);

-- CreateIndex
CREATE INDEX "activity_logs_entity_type_entity_id_idx" ON "activity_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at" DESC);

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_created_at_idx" ON "audit_logs"("actor_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "visitor_sessions_anon_id_idx" ON "visitor_sessions"("anon_id");

-- CreateIndex
CREATE INDEX "visitor_sessions_started_at_idx" ON "visitor_sessions"("started_at" DESC);

-- CreateIndex
CREATE INDEX "page_views_created_at_idx" ON "page_views"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_slug_key" ON "product_categories"("slug");

-- CreateIndex
CREATE INDEX "product_categories_is_active_sort_order_idx" ON "product_categories"("is_active", "sort_order");

-- CreateIndex
CREATE INDEX "product_categories_parent_id_idx" ON "product_categories"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE INDEX "brands_is_active_sort_order_idx" ON "brands"("is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE INDEX "products_status_is_featured_sort_order_idx" ON "products"("status", "is_featured", "sort_order");

-- CreateIndex
CREATE INDEX "products_category_id_status_sort_order_idx" ON "products"("category_id", "status", "sort_order");

-- CreateIndex
CREATE INDEX "products_brand_id_status_idx" ON "products"("brand_id", "status");

-- CreateIndex
CREATE INDEX "product_images_product_id_sort_order_idx" ON "product_images"("product_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_status_sort_order_idx" ON "services"("status", "sort_order");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_cards" ADD CONSTRAINT "rate_cards_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_card_items" ADD CONSTRAINT "rate_card_items_rate_card_id_fkey" FOREIGN KEY ("rate_card_id") REFERENCES "rate_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "estimates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_rate_card_id_fkey" FOREIGN KEY ("rate_card_id") REFERENCES "rate_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_inputs" ADD CONSTRAINT "estimate_inputs_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_line_items" ADD CONSTRAINT "estimate_line_items_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_line_items" ADD CONSTRAINT "estimate_line_items_overridden_by_fkey" FOREIGN KEY ("overridden_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "tiers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_crew_lead_fkey" FOREIGN KEY ("crew_lead") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_templates" ADD CONSTRAINT "task_templates_phase_key_fkey" FOREIGN KEY ("phase_key") REFERENCES "phase_templates"("key") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_phases" ADD CONSTRAINT "project_phases_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "project_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tasks" ADD CONSTRAINT "project_tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_payments" ADD CONSTRAINT "project_payments_recorded_by_fkey" FOREIGN KEY ("recorded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_updates" ADD CONSTRAINT "project_updates_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_updates" ADD CONSTRAINT "project_updates_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_moderated_by_fkey" FOREIGN KEY ("moderated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_content" ADD CONSTRAINT "site_content_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitor_sessions" ADD CONSTRAINT "visitor_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "visitor_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "product_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
