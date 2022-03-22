from django.test import TestCase, Client
from .models import *
from django.urls import reverse
import json

class ApiTest(TestCase):
    def setUp(self):
        """Setting up data for tests."""

        self.client = Client()

        self.genre_1 = Genre.objects.create(name="genre_1")
        self.genre_2 = Genre.objects.create(name="genre_2")

        self.mood_1 = Mood.objects.create(name="mood_1")
        self.mood_2 = Mood.objects.create(name="mood_2")

        self.artist_1 = Artist.objects.create(name="artist_1")

        # -------------------------------------------- initialize tracks -------------------------------------------- #
        self.track_data_1 = {
            "id": "0dQiJavYYb",
            "title": "Hellonelia",
            "length": 208,
            "bpm": 0,
        }
        self.test_track_1 = Track.objects.create(**self.track_data_1)
        self.test_track_1.genres.add(self.genre_1)
        self.test_track_1.mood.add(self.mood_1)
        self.test_track_1.main_artists.add(self.artist_1)

        self.track_data_2= {
            "id": "8Z4PScTrns",
            "title": "Stocked",
            "length": 172,
            "bpm": 172,
        }
        self.test_track_2 = Track.objects.create(**self.track_data_2)
        self.test_track_2.genres.add(self.genre_2)
        self.test_track_2.mood.add(self.mood_1)
        self.test_track_2.mood.add(self.mood_2)
        self.test_track_2.main_artists.add(self.artist_1)

        # -------------------------------------------- initialize playlists -------------------------------------------- #
        self.playlist_data_1= {
            "id": 1,
            "name": "hello",
            "tracks": [self.test_track_1, self.test_track_2]
        }
        self.test_playlist_1 = Playlist.objects.create(**self.playlist_data_1)

        self.playlist_data_2= {
            "id": 2,
            "name": "world",
            "tracks": [self.test_track_2]
        }
        self.test_playlist_2 = Playlist.objects.create(**self.playlist_data_2)
        

    def test_list_tracks(self):
        """
            Test Case: GET /tracks
            Test if API is able to retrieve a list of all tracks
        """
        
        # check response format
        response = self.client.get(reverse('tracks'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue('tracks' in response.json())
        response_data = response.json()
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['tracks']), 2)
        tracks_data = sorted(response_data['tracks'], key= lambda x: x["id"])

        # check track 1
        self.assertEqual(tracks_data[0]['id'], self.track_data_1['id'])
        self.assertEqual(tracks_data[0]['title'], self.track_data_1['title'])
        self.assertEqual(tracks_data[0]['length'], self.track_data_1['length'])
        self.assertEqual(tracks_data[0]['bpm'], self.track_data_1['bpm'])
        self.assertEqual(tracks_data[0]['genres'], set(self.genre_1))
        self.assertEqual(tracks_data[0]['moods'], set(self.mood_1))
        self.assertEqual(tracks_data[0]['main_artists'], set(self.artist_1))
        self.assertEqual(tracks_data[0]['featured_artists'], set())

        # todo: fix assert pure properties
        # self.assertEqual(tracks_data[0]['audio'], self.track_data_1['audio'])
        # self.assertEqual(tracks_data[0]['cover_art'], self.track_data_1['cover_art'])
        # self.assertEqual(tracks_data[0]['waveform'], self.track_data_1['waveform'])
        # self.assertEqual(tracks_data[0]['spotify'], self.track_data_1['spotify'])

        # check track 2
        self.assertEqual(tracks_data[1]['id'], self.track_data_2['id'])
        self.assertEqual(tracks_data[1]['title'], self.track_data_2['title'])
        self.assertEqual(tracks_data[1]['length'], self.track_data_2['length'])
        self.assertEqual(tracks_data[1]['bpm'], self.track_data_2['bpm'])
        self.assertEqual(tracks_data[1]['genres'], set(self.genre_2))
        self.assertEqual(tracks_data[1]['moods'], set([self.mood_1, self.mood_2]))
        self.assertEqual(tracks_data[1]['main_artists'], set(self.artist_1))
        self.assertEqual(tracks_data[1]['featured_artists'], set())

        # todo: fix assert pure properties
        # self.assertEqual(tracks_data[1]['audio'], self.track_data_2['audio'])
        # self.assertEqual(tracks_data[1]['cover_art'], self.track_data_2['cover_art'])
        # self.assertEqual(tracks_data[1]['waveform'], self.track_data_2['waveform'])
        # self.assertEqual(tracks_data[1]['spotify'], self.track_data_2['spotify'])


    def test_list_playlist(self):
        """
            Test Case: GET /playlists
            Test if API is able to retrieve a list of all playlists
        """
        
        # check response format
        response = self.client.get(reverse('/playlists'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue('playlists' in response.json())
        response_data = response.json()
        self.assertTrue(response_data['success'])
        self.assertEqual(len(response_data['playlists']), 2)
        playlists_data = sorted(response_data['playlists'], key= lambda x: x["id"])

        # check playlist 1 
        self.assertEqual(playlists_data[0]['name'], self.playlist_data_1['name'])
        self.assertEqual(playlists_data[0]['tracks'], set([self.track_data_1, self.track_data_2]))

        # check playlist 2
        self.assertEqual(playlists_data[1]['name'], self.playlist_data_2['name'])
        self.assertEqual(playlists_data[1]['tracks'], set([self.track_data_2]))


    def test_retrieve_playlist(self):
        """
            Test Case: GET /playlists/<str:id>/
            Test if API is able to retrieve data of a specific playlist based on the playlist's id
        """
        test_playlist_id = '2'
        response = self.client.get(reverse('playlists', args=[test_playlist_id]))

        # check response format
        self.assertEqual(response.status_code, 200)
        self.assertTrue('user' in response.json())
        response_data = response.json()
        self.assertTrue(response_data['success'])
        playlist_data = response_data['playlist']
        
        # check user data 
        self.assertEqual(playlist_data['name'], self.playlist_data_2['name'])
        self.assertEqual(playlist_data['tracks'], [self.track_data_2])


    def test_retrieve_missing_playlist(self):
        pass


    def test_add_tracks_to_playlist(self):
        pass


    def test_add_missing_tracks_to_playlist(self):
        pass


    def test_add_tracks_to_missing_playlist(self):
        pass


    def test_add_duplicate_tracks_to_playlist(self):
        pass


    def test_remove_tracks_from_playlist(self):
        pass


    def test_remove_missing_tracks(self):
        pass


    def test_create_playlist(self):
        """
            Test Case: POST /playlist
            Test if API is able to create a playlist with correct fields filled up
        """

        test_playlist_data = {
            "id": 3,
            "name": "world",
            "tracks": []
        }

        response = self.client.post(reverse('playlists', json.dumps(test_playlist_data), content_type="application/json"))
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        self.assertTrue(response_data['success'])
        self.assertTrue('data' in response_data)
        playlist_data = response_data['playlist']
        
        # check playlist data 
        self.assertEqual(playlist_data['id'], test_playlist_data['id'])
        self.assertEqual(playlist_data['name'], test_playlist_data['name'])
        self.assertEqual(playlist_data['tracks'], test_playlist_data['tracks'])
    
        # test created playlist exists in database
        response = self.client.get(reverse('playlists', args=[test_playlist_data['id']]), )
        self.assertEqual(response.status_code, 200)
        self.assertTrue('playlist' in response.json())
        response_data = response.json()
        self.assertTrue(response_data['success'])

        # test playlist content
        playlist_data = response_data['playlist']
        self.assertEqual(playlist_data['id'], test_playlist_data['id'])
        self.assertEqual(playlist_data['name'], test_playlist_data['name'])
        self.assertEqual(playlist_data['tracks'], set())


    def test_create_duplicate_playlist(self):
        pass


    def test_remove_playlist(self):
        """
            Test Case: DELETE /playlist/<str:id>/
            Test if API is able to delete playlist given the playlist's id
        """

        test_playlist_id = '1'
        response = self.client.delete(reverse('playlists', args=[test_playlist_id]))

        # check response format
        self.assertEqual(response.status_code, 200)
        self.assertTrue('success' in response.json())
        response_data = response.json()
        self.assertTrue(response_data['success'])
        
        # check if playlist has already been deleted
        response = self.client.get(reverse('playlists', args=[test_playlist_id]))
        self.assertEqual(response.status_code, 404)
        self.assertTrue('error' in response.json())
        response_data = response.json()
        self.assertFalse(response_data['success'])
        self.assertEqual(response_data['error'], 'The user does not exist')

    def test_remove_missing_playlist(self):
        pass
