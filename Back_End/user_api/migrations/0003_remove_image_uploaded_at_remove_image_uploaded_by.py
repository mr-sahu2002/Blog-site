# Generated by Django 4.1.5 on 2024-02-29 16:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0002_remove_blogpost_images_blogpost_images'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='uploaded_at',
        ),
        migrations.RemoveField(
            model_name='image',
            name='uploaded_by',
        ),
    ]