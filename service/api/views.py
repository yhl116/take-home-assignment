from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    """Playlist view set

    Methods:
        create: Inherit from super. Create a new playlist.
        destroy: Inherit from super. Deletes a playlist.
    """

    serializer_class = serializers.GetPlaylistSerializer
    queryset = models.Playlist.objects.all()

    def create(self, request):
        # todo: handle create playlist with duplicated names

        serializer = serializers.PostPlaylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        """Handles adding or removing tracks from playlists"""

        operation = request.data.get("operation", "")

        if operation == "add":
            if "track_id" in request.data and "playlist_name" in request.data:
                playlist = get_object_or_404(models.Playlist, name=request.data.get("playlist_name", ""))
                track = get_object_or_404(models.Track, pk=request.data.get("track_id", ""))

                playlist.tracks.add(track)
                playlist.save()
                return Response({"success": True}, status=status.HTTP_202_ACCEPTED)

        if operation == "remove":
            # todo: identify playlist using pk instead of playlist_name
            if "track_id" in request.data and "playlist_name" in request.data:
                playlist = get_object_or_404(models.Playlist, name=request.data.get("playlist_name", ""))
                track = get_object_or_404(models.Track, pk=request.data.get("track_id", ""))

                playlist.tracks.remove(track)
                playlist.save()
                return Response(status=status.HTTP_202_ACCEPTED)

        return Response({'message': 'Invalid update operation.'}, status=status.HTTP_400_BAD_REQUEST)
