//packages
import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:line_icons/line_icons.dart';
//screens
//widgets
//providers

enum SettingTrailing { toggle, arrow }

class SettingsTile extends StatelessWidget {
  final IconData iconData;
  final String title;
  final bool? toggle;
  final Function(bool)? onToggle;
  final SettingTrailing settingTrailing;

  const SettingsTile({
    Key? key,
    required this.iconData,
    required this.title,
    this.toggle,
    this.settingTrailing = SettingTrailing.arrow,
    this.onToggle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: 55,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            children: [
              SizedBox(
                child: Row(
                  children: [
                    Icon(iconData, color: Colors.black, size: 26),
                    const SizedBox(
                      width: 20,
                    ),
                    Text(
                      title,
                      style: TextStyle(color: Colors.black, fontSize: 17),
                    )
                  ],
                ),
              ),
              const Spacer(),
              if (settingTrailing == SettingTrailing.toggle)
                FlutterSwitch(
                  width: 50,
                  padding: 1,
                  activeColor: Theme.of(context).primaryColor,
                  height: 25,
                  value: toggle!,
                  onToggle: onToggle!,
                ),
              if (settingTrailing == SettingTrailing.arrow)
                Icon(LineIcons.angleRight, color: Colors.black)
            ],
          ),
        ),
      ),
    );
  }
}
