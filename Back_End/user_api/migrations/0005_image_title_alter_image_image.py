# Generated by Django 4.1.5 on 2024-03-01 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0004_alter_image_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(default='', upload_to='posts/'),
        ),
    ]
