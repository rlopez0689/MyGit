from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from MyGit import MyGit
from gitelements.models import MERGED
from gitelements.serializers import BranchSerializer, CommitSerializer, PRSerializer
from gitelements.models import PR

import os

class BranchList(APIView):    
    def get(self, request, format=None):
        branches = MyGit(os.environ['REPO_PATH']).get_all_branches()
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data)


class BranchDetail(APIView):    
    def get(self, request, name, format=None):
        branch = MyGit(os.environ['REPO_PATH']).get_branch(name)
        if not branch:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BranchSerializer(branch[0])
        return Response(serializer.data)


class CommitDetail(APIView):
    def get(self, request, hexsha, format=None):
        commit = MyGit(os.environ['REPO_PATH']).get_commit(hexsha)
        if not commit:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CommitSerializer(commit)
        return Response(serializer.data)


class PRViewSet(ModelViewSet):
    queryset = PR.objects.all()
    serializer_class = PRSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('status') == MERGED:
            MyGit(os.environ['REPO_PATH']).merge(serializer.validated_data['org_branch'], serializer.validated_data['dest_branch'])
        serializer.save()
        return super().create(request, *args, **kwargs)