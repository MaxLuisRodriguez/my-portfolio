"""
WSGI config for WAW Energy API project.
Production-ready WSGI configuration.
"""

import os
from django.core.wsgi import get_wsgi_application

# Set default settings module based on environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'waw_energy_api.settings.development')

application = get_wsgi_application()
