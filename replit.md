# Esaal - Medical Appointment Platform

## Overview

A full-stack medical appointment platform for mental health professionals in Egypt, inspired by Esaal. Supports patients, doctors, and an admin role.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (wouter for routing, TanStack Query)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Auth**: JWT (bcryptjs + jsonwebtoken)
- **Build**: esbuild (CJS bundle)

## Features

- **Patient**: Register, browse/filter doctors by specialty/type/gender, view doctor profiles, book time slots
- **Doctor**: Dashboard with stats, manage availability slots, view appointments, mark appointments as paid, calendar view (paid-only)
- **Admin**: Full access to all appointments, all doctors, all users, platform stats, mark any appointment as paid, calendar view

## Demo Credentials

- **Admin**: admin@esaal.com / admin123
- **Doctor**: karim@esaal.com / doctor123 (or any other seeded doctor's email)
- **Patient**: patient@esaal.com / patient123

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/esaal run dev` — run frontend locally

## Architecture

- `artifacts/esaal/` — React+Vite frontend
- `artifacts/api-server/` — Express 5 REST API
- `lib/api-spec/openapi.yaml` — Single source of truth for API contract
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod validation schemas
- `lib/db/` — Drizzle ORM schema and client

## DB Schema

- `users` — patients, doctors, admin
- `doctors` — doctor profiles linked to users
- `slots` — doctor availability time slots
- `appointments` — booked appointments with payment tracking
- `password_reset_tokens` — time-limited tokens for the forgot-password flow (expires in 1 hour, single-use)

## Appointment Payment Flow

1. Patient books a slot → appointment created with `isPaid: false`
2. Doctor or Admin can mark it as paid via "Mark Paid" button
3. Once `isPaid: true`, appointment appears in the Calendar view for that doctor/admin

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
