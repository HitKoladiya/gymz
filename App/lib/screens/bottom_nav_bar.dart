//packages
import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:hidable/hidable.dart';
//screens
import 'searchScreen.dart';
import './home_screen.dart';
import './profile_screen.dart';

//widgets
//providers

class BottomNavBar extends StatefulWidget {
  static const route = '/';
  const BottomNavBar({super.key});

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  final ScrollController _scrollController = ScrollController();
  int index = 0;
  @override
  Widget build(BuildContext context) {
    final screens = [
      SearchScreen(_scrollController),
      HomeScreen(),
      // SearchScreen(),
      UserPage(),
    ];
    return Scaffold(
      body: screens[index],
      bottomNavigationBar: Hidable(
        controller: _scrollController,
        child: CurvedNavigationBar(
          items: const [
            Icon(
              Icons.home_outlined,
            ),
            Icon(
              Icons.search_outlined,
            ),
            Icon(
              Icons.person_2_outlined,
            ),
          ],
          index: index,
          color: Theme.of(context).primaryColor,
          backgroundColor: Color.fromARGB(0, 0, 0, 0),
          onTap: (value) {
            setState(() {
              index = value;
            });
          },
        ),
      ),
    );
  }
}
