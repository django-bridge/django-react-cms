# Generated by Django 5.0.7 on 2025-03-28 21:26

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        (
            "djangopress_media",
            "0005_mediaasset_file_content_type_mediaasset_file_hash_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="mediaasset",
            name="status",
        ),
    ]
