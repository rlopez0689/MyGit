# Generated by Django 4.0.1 on 2022-01-21 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gitelements', '0002_alter_pr_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pr',
            name='status',
            field=models.IntegerField(choices=[(1, 'Open'), (2, 'Merged'), (3, 'Closed')]),
        ),
    ]
