from statistics import mode
from django.db import models


OPEN = 1
MERGED = 2
CLOSED = 3

PR_STATUS =( 
    (OPEN, "Open"), 
    (MERGED, "Merged"), 
    (CLOSED, "Closed"), 
)

class PR(models.Model):
    title = models.CharField(max_length=40)
    description = models.TextField()
    author = models.CharField(max_length=40)
    org_branch = models.TextField()
    dest_branch = models.TextField()
    status = models.IntegerField(choices=PR_STATUS)