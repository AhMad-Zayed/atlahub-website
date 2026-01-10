# Copilot instructions for this repository

This is a small Django project. Keep suggestions targeted, minimal, and explicit
to the project layout and conventions found here.

- **Project layout:** single Django project `core` and one app `trips`.
  - `core/settings.py` contains DB (SQLite), `INSTALLED_APPS` and `TEMPLATES`.
  - `core/urls.py` only exposes the admin route by default.
  - `trips/models.py` defines `TripMaster` and `TripInstance` (see `related_name='instances'`).

- **Big picture / architecture:**
  - Monolithic Django app: web app + admin + models backed by SQLite (`db.sqlite3`).
  - Media assets: `TripMaster.image` uses `ImageField` — Pillow and MEDIA settings are required for image uploads (not present in `core/settings.py`).

- **Developer workflows / commands:**
  - Run migrations: `python manage.py migrate`
  - Create superuser: `python manage.py createsuperuser`
  - Run dev server: `python manage.py runserver`
  - Run tests: `python manage.py test`
  - If working with images, install Pillow: `pip install Pillow`

- **Project-specific conventions & patterns:**
  - Models use Arabic docstrings / `verbose_name` on fields — preserve these when adding fields.
  - `TripInstance.is_archived` encodes archive logic (uses `timezone.now().date()`); reuse this pattern for date-based properties.
  - Admin isn't registering models yet — register models in `trips/admin.py` when exposing them in the admin UI.

- **Integration points / TODOs to be aware of:**
  - `core/urls.py` must be extended to include app URLs (e.g. `path('', include('trips.urls'))`) when adding public views.
  - `core/settings.py` defines `STATIC_URL` but no `MEDIA_URL`/`MEDIA_ROOT`; add them for file uploads.
  - Database is SQLite for development — migrations should be used for schema changes.

- **Examples from codebase:**
  - Model FK: `master = models.ForeignKey(TripMaster, on_delete=models.CASCADE, related_name='instances')` (`trips/models.py`).
  - Auto-timestamp: `created_at = models.DateTimeField(auto_now_add=True)` (`trips/models.py`).

- **When editing code, prefer small, focused changes:**
  - Add URL routes in `core/urls.py` and create `trips/urls.py` instead of modifying global routing heavily.
  - Register new models in `trips/admin.py` to make them manageable via admin.

If anything here is unclear or you want more detail (permission model, media handling, or tests), say which area to expand.
