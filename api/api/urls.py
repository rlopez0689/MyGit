from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from gitelements.views import BranchList, BranchDetail, CommitDetail, PRViewSet

router = DefaultRouter()
router.register(r'prs', PRViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/branches/', BranchList.as_view()),
    path('api/branches/<str:name>', BranchDetail.as_view()),
    path('api/commits/<str:hexsha>', CommitDetail.as_view()),
    path('api/', include(router.urls))
]
