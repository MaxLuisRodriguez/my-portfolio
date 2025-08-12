#!/bin/bash

# WAW Energy Backend Development Setup Script
# Run this script to set up your development environment

set -e

echo "🚀 Setting up WAW Energy Backend Development Environment"
echo "======================================================"

# Check if Python 3.11+ is installed
python_version=$(python3 --version 2>&1 | cut -d" " -f2 | cut -d"." -f1,2)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python 3.11+ is required. Found: $python_version"
    exit 1
fi

echo "✅ Python version check passed: $python_version"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p static
mkdir -p media
mkdir -p staticfiles

# Check if we can connect to database
echo "🔍 Checking database connection..."
python manage.py check --deploy --settings=waw_energy_api.settings.development || {
    echo "⚠️  Database connection issues detected."
    echo "   Please make sure MySQL is running and .env is configured correctly."
}

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py migrate --settings=waw_energy_api.settings.development

# Create superuser prompt
echo ""
echo "👤 Create superuser account? (y/n)"
read -r create_superuser
if [ "$create_superuser" = "y" ] || [ "$create_superuser" = "Y" ]; then
    python manage.py createsuperuser --settings=waw_energy_api.settings.development
fi

# Generate sample data prompt
echo ""
echo "📊 Generate sample data? (y/n)"
read -r generate_data
if [ "$generate_data" = "y" ] || [ "$generate_data" = "Y" ]; then
    python manage.py loaddata fixtures/sample_data.json --settings=waw_energy_api.settings.development || {
        echo "⚠️  Sample data not found. You can create some manually or sync from Shopify."
    }
fi

echo ""
echo "🎉 Development environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env file with your Shopify and database credentials"
echo "   2. Start the development server: python manage.py runserver"
echo "   3. Visit http://localhost:8000/api/docs/ for API documentation"
echo "   4. Visit http://localhost:8000/admin/ for Django admin"
echo ""
echo "🔧 Useful commands:"
echo "   - Start server: python manage.py runserver"
echo "   - Run tests: python manage.py test"
echo "   - Sync products: python manage.py sync_products"
echo "   - Create superuser: python manage.py createsuperuser"
echo ""
echo "Happy coding! 🚀"
