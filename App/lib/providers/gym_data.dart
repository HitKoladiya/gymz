//packages
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
//screens
//widgets
//providers
import './gym_data_provider.dart';
import './favs_list.dart';
import './bookings.dart';

class GymListData with ChangeNotifier {
  GymListData(
      {this.imagePath = '',
      this.titleTxt = '',
      this.subTxt = "",
      this.dist = 1.8,
      this.reviews = 80,
      this.rating = 4.5,
      this.perNight = 180,
      this.city = "Nadiad"});

  String imagePath;
  String titleTxt;
  String subTxt;
  String city;
  double dist;
  double rating;
  int reviews;
  int perNight;
  bool isFav = false;

  void toggleFavorite() {
    isFav = !isFav;
    if (isFav)
      addFav(this);
    else
      removeFav(this);
    notifyListeners();
  }

  void subscribe(GymListData gym) {
    print("subscribed");
    http
        .post(Uri.parse('http://10.0.2.2:3000/subscribe'), body: {
          "userName": "Hiranj",
          "userEmail": "koladiyahit45@gmail.com",
          "fitnessCenterEmail": "koladiyahit45@gmail.com",
          "fitnessCenterName": "hammar",
          "Date": "12-april-2023",
          "Time": "12:00 - 2:00"
        })
        .then((value) => print('body : ${value.body} '))
        .then((value) => Bkgs.add(
            Bookings(gym: gym, id: DateTime.now().toString(), days: '10')));
    notifyListeners();
  }
}
