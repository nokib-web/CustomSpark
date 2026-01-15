#!/bin/bash

# Database Backup Script
# Usage: ./scripts/backup-db.sh

# Configuration
DB_NAME="ecommerce_db"
DB_USER="postgres"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "📦 Starting backup for database: $DB_NAME..."

# Perform backup using pg_dump
# Note: Requires pg_dump to be installed and accessible in PATH
# Password should be provided via .pgpass file or PGPASSWORD env var
if command -v pg_dump &> /dev/null; then
    pg_dump -U $DB_USER -d $DB_NAME -F p -f "$BACKUP_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✅ Backup successful: $BACKUP_FILE"
        echo "   Size: $(du -h "$BACKUP_FILE" | cut -f1)"
        
        # Keep only last 5 backups
        ls -tp $BACKUP_DIR/db_backup_*.sql | tail -n +6 | xargs -I {} rm -- "{}"
    else
        echo "❌ Backup failed!"
        rm "$BACKUP_FILE"
        exit 1
    fi
else
    echo "❌ Error: pg_dump not found in PATH"
    exit 1
fi
