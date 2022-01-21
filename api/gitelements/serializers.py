import imp
from rest_framework import serializers

from gitelements.models import PR

class CommitSerializer(serializers.Serializer):
    message = serializers.CharField()
    author_name = serializers.CharField()
    author_email = serializers.CharField()
    date = serializers.DateTimeField()
    no_files_changed = serializers.IntegerField()
    hexsha = serializers.CharField()


class BranchSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    commits = CommitSerializer(many=True)


class PRSerializer(serializers.ModelSerializer):
    class Meta:
        model = PR
        fields = '__all__'