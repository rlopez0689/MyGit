from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gitelements.views import BranchList, BranchDetail, CommitDetail, PRViewSet

router = DefaultRouter()
router.register(r'prs', PRViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/branches/', BranchList.as_view(), name="get-branches"),
    path('api/branches/<str:name>', BranchDetail.as_view(), name='get-branch'),
    path('api/commits/<str:hexsha>', CommitDetail.as_view(), name="get-commit"),
    path('api/', include(router.urls))
]
