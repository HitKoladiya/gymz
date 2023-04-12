//packages
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
//screens
//widgets
//providers
import './gym_data.dart';

class Bookings with ChangeNotifier {
  final GymListData gym;
  final String id;
  final String days;

  Bookings({
    required this.gym,
    required this.id,
    required this.days,
  });
}

List<Bookings> Bkgs = [];

void addBooking(Bookings booking) {
  Bkgs.add(booking);
}

void removeBooking(Bookings booking) {
  Bkgs.remove(booking);
}
