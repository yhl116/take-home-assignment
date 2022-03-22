from django.urls import include, path
from rest_framework import routers
# import debug_toolbar

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlists", views.PlaylistViewSet, basename="Playlist")

urlpatterns = [
    path("", include(router.urls)),
    # path("__debug__/", include("debug_toolbar.urls")),
]
