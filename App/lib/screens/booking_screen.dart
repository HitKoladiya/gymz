//packages
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
//screens
//widgets
import '../widgets/booking_tile.dart';
//providers
import '../providers/gym_data.dart';
import '../providers/bookings.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final gyms = Provider.of<GymListData>(context);
    print(Bkgs.length);
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).primaryColor,
          title: Text(
            'My Bookings',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              fontSize: 28,
            ),
          ),
        ),
        body: Bkgs.length == 0
            ? Center(
                child: Text(
                  "No Bookings",
                  style: TextStyle(fontSize: 20),
                ),
              )
            : Container(
                height: MediaQuery.of(context).size.height - 200,
                child: ListView.separated(
                    separatorBuilder: (context, index) {
                      return SizedBox(
                        height: 10,
                      );
                    },
                    itemBuilder: (context, Index) {
                      return cardWidget(
                          context,
                          Bkgs[Index].gym.imagePath,
                          Bkgs[Index].gym.titleTxt,
                          "ID: 123456789",
                          "Desc",
                          "₹${Bkgs[Index].gym.perNight}",
                          "Due in ${Bkgs[Index].days} days",
                          Colors.green);
                    },
                    itemCount: Bkgs.length),
              ));
  }
}
