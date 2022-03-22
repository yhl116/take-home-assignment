from rest_framework import serializers

from . import models


class TrackSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    moods = serializers.StringRelatedField(many=True)
    main_artists = serializers.StringRelatedField(many=True)
    featured_artists = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Track
        fields = [
            "id",
            "title",
            "length",
            "bpm",
            "genres",
            "moods",
            "main_artists",
            "featured_artists",
            "audio",
            "cover_art",
            "waveform",
            "spotify",
        ]
        extra_kwargs = {'playlist': {'required': False}}


class GetPlaylistSerializer(serializers.ModelSerializer):
    # todo: list playlist serializer does not need to include tracks as it is currently not needed

    tracks = TrackSerializer(many=True)

    class Meta:
        model = models.Playlist
        fields = [
            "id",
            "name",
            "tracks"
        ]
        extra_kwargs = {'tracks': {'required': False}}


class PostPlaylistSerializer(GetPlaylistSerializer):
    tracks = serializers.StringRelatedField(many=True)
