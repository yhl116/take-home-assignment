from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

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

    def list(self):
        queryset = models.Playlist.objects.all()
        serializer = serializers.PlaylistSerializer(queryset, many=True)
        return Response(serializer.data)


    def retrieve(self, playlist_id):
        """Gets playlist data and data of tracks in playlist.

        Args:
            playlist_id (int): Playlist primary key.

        Returns:
            dict: Playlist data with data of all its tracks.
        """

        # get playlist from playlist id
        playlist_queryset = models.Playlist.objects.filter(pk=playlist_id)
        playlist_serializer = serializers.PlaylistSerializer(playlist_queryset)
        playlist_data = playlist_serializer.data

        # get tracks in playlist
        track_queryset = models.Playlist.objects.filter(pk__in=playlist_data.tracks)
        track_serializer = serializers.TrackSerializer(track_queryset)

        # add tracks data into playlist
        playlist_data["tracks_data"] = track_serializer.data
        
        return Response(playlist_data)


    def partial_update(self, request):
        operation = request.get("operation")
        playlist_name = request.get("playlist_name")
        track_id = request.get("track_id")

        queryset = models.Playlist.objects.filter(name=playlist_name)
        serializer = serializers.PlaylistSerializer(queryset)

        if operation == "add":
            if not track_id in serializer.tracks:
                updated_tracks = serializer.tracks + [track_id]
                serializers.PlaylistSerializer(serializer.id, tracks=updated_tracks, partial=True)
                return Response(status=status.HTTP_202_ACCEPTED)

        if operation == "remove":
            if track_id in serializer.tracks:
                updated_tracks = serializer.tracks.remove(track_id)
                serializers.PlaylistSerializer(serializer.id, tracks=updated_tracks, partial=True)
                return Response(status=status.HTTP_202_ACCEPTED)

        return Response({'message': 'Invalid update operation.'}, status=status.HTTP_400_BAD_REQUEST)
