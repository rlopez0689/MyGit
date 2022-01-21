from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from MyGit import MyGit
from gitelements.models import MERGED, OPEN, CLOSED
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
    queryset = PR.objects.all().order_by('-id')
    serializer_class = PRSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.get('status') == MERGED:
            try:
                MyGit(os.environ['REPO_PATH']).merge(serializer.validated_data['org_branch'], serializer.validated_data['dest_branch'])
            except Exception as e:
                return Response(f'${e}', status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)


    @action(detail=True, methods=['post'])
    def merge(self, request, pk=None):
        pr = get_object_or_404(PR, pk=pk)
        print(pr.status == OPEN)
        if pr.status == OPEN:
            try:
                MyGit(os.environ['REPO_PATH']).merge(pr.org_branch, pr.dest_branch)
                pr.status = CLOSED
                pr.save()
            except Exception as e:
                return Response(f'${e}', status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_202_ACCEPTED)


    @action(detail=True, methods=['post'])
    def close(self, request, pk=None):
        pr = get_object_or_404(PR, pk=pk)
        if pr.status == OPEN:
            pr.status = CLOSED
            pr.save()
        return Response(status=status.HTTP_202_ACCEPTED)