# Generated by Django 4.0.1 on 2022-01-20 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PR',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('author', models.CharField(max_length=40)),
                ('org_branch', models.TextField()),
                ('dest_branch', models.TextField()),
                ('status', models.CharField(choices=[(1, 'Open'), (2, 'Merged'), (3, 'Closed')], max_length=10)),
            ],
        ),
    ]
