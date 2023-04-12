//packages
import 'package:flutter/material.dart';
//screens
//widgets
//providers

Widget cardWidget(BuildContext context, String image, String title,
    String subtitle, String desc, String amount, String days, Color color) {
  return Material(
    elevation: 2.0,
    borderRadius: BorderRadius.circular(18.0),
    child: Container(
      width: MediaQuery.of(context).size.width - 30.0,
      height: 130.0,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18.0),
        color: Colors.white,
      ),
      child: Padding(
        padding: const EdgeInsets.only(top: 8.0),
        child: Row(
          children: <Widget>[
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  ListTile(
                    title: Text(
                      title,
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 15.0),
                    ),
                    leading: Container(
                      width: 40.0,
                      height: 40.0,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10.0),
                          border: Border.all(color: Colors.black, width: 1),
                          image: DecorationImage(
                              image: NetworkImage(image), fit: BoxFit.cover)),
                    ),
                    subtitle: Text(
                      subtitle,
                      style: TextStyle(color: Colors.grey, fontSize: 12.0),
                    ),
                    trailing: Container(
                      width: 80.0,
                      height: 25.0,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20.0),
                          color: Colors.grey[300]),
                      child: Center(
                        child: Text(
                          'Select',
                          style: TextStyle(color: Colors.black, fontSize: 12.0),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 12.0, right: 12.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          desc,
                          style: TextStyle(
                              decoration: TextDecoration.underline,
                              color: color,
                              fontSize: 14.0,
                              fontWeight: FontWeight.bold),
                        ),
                        Column(
                          children: <Widget>[
                            Text(
                              amount,
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.bold),
                            ),
                            Text(
                              days,
                              style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 13.0,
                                  fontWeight: FontWeight.bold),
                            ),
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
