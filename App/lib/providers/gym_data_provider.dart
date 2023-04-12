//packages
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
//screens
//widgets
//providers
import './gym_data.dart';
import './favs_list.dart';

class GymDataProvider with ChangeNotifier {
  bool isfavSelected = false;
  List<GymListData> _items = <GymListData>[
    GymListData(
      imagePath:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      titleTxt: 'SFW The GYM(Nadiad)',
      city: "Nadiad",
      subTxt:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
      dist: 2.0,
      reviews: 80,
      rating: 4.0,
      perNight: 180,
    ),
    GymListData(
      city: "Nadiad",
      imagePath:
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      titleTxt: 'The Challenger gym',
      subTxt: 'Wembley, London',
      dist: 4.0,
      reviews: 74,
      rating: 4.5,
      perNight: 200,
    ),
    GymListData(
      imagePath:
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      city: "NAdiad",
      titleTxt: 'The muscle factory gym',
      subTxt: 'Wembley, London',
      dist: 3.0,
      reviews: 62,
      rating: 5.0,
      perNight: 60,
    ),
    GymListData(
      city: "Nadiad",
      imagePath:
          'https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      titleTxt: 'Wellocity Prime Gym',
      subTxt: 'Wembley, London',
      dist: 7.0,
      reviews: 90,
      rating: 3.4,
      perNight: 170,
    ),
    GymListData(
      city: "Nadiad",
      imagePath:
          'https://media.istockphoto.com/id/1345228934/photo/gym.jpg?b=1&s=170667a&w=0&k=20&c=z_Fn267wdI8HFe0EjMbmreEqcY7pgYe7KDUpkTsvxIc=',
      titleTxt: 'New Fitness Point',
      subTxt: 'Wembley, London',
      dist: 2.0,
      reviews: 240,
      rating: 2.5,
      perNight: 200,
    ),
  ];
  List<GymListData> filtered = [];
  bool isfilterd = false;
  List<GymListData> get items {
    if (isfavSelected) {
      return favs;
    }
    if (isfilterd) return [...filtered];
    return [..._items];
  }

  GymListData findById(String id) {
    return _items.firstWhere((gym) => gym.titleTxt == id);
  }

  void filterList(String filter) {
    filtered = _items
        .where((term) =>
            term.titleTxt.toLowerCase().contains(filter.toLowerCase()))
        .toList();
    isfilterd = true;
    notifyListeners();
  }

  void ToggleFav() {
    isfavSelected = !isfavSelected;
    notifyListeners();
  }

  void Notifier() {
    notifyListeners();
  }
}
