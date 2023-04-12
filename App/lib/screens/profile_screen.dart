//packages
import 'package:flutter/material.dart';
import 'package:line_icons/line_icons.dart';
//screens
//widgets
import '../widgets/profile_widget.dart';
import '../widgets/setting_tile.dart';
//providers
import '../providers/gym_data_provider.dart';

class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  bool isSearch = false;
  bool toggle = true;
  TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
            child: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(
                height: 35,
              ),
              ProfileTile(
                image:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                name: "Jay Keraliya",
              ),
              const SizedBox(
                height: 20,
              ),
              Divider(
                thickness: 0.3,
                indent: 100,
                endIndent: 100,
                color: Colors.grey.withOpacity(0.6),
              ),
              const SizedBox(
                height: 10,
              ),
              SettingsTile(
                  title: "Notifications",
                  settingTrailing: SettingTrailing.toggle,
                  onToggle: (value) {
                    setState(() {
                      toggle = value;
                    });
                  },
                  toggle: toggle,
                  iconData: LineIcons.bell),
              const SizedBox(
                height: 30,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 22.0, bottom: 10),
                child: Row(
                  children: [
                    Text(
                      "MANAGE",
                      style: TextStyle(
                          fontWeight: FontWeight.w700, color: Colors.grey),
                    )
                  ],
                ),
              ),
              Column(
                children: [
                  SettingsTile(
                      title: "Settings",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: LineIcons.cog),
                  SettingsTile(
                      title: "Share",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: LineIcons.share),
                  SettingsTile(
                      title: "Change Password",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: LineIcons.lock),
                  SettingsTile(
                      title: "FAQ",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: Icons.question_answer_outlined),
                  SettingsTile(
                      title: "Help",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: Icons.help_outline),
                  SettingsTile(
                      title: "Invite a friend",
                      settingTrailing: SettingTrailing.arrow,
                      iconData: LineIcons.users),
                ],
              ),
              Expanded(
                  child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'from',
                      style: TextStyle(
                          color: Colors.grey.withOpacity(0.8), fontSize: 13),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Icon(
                          LineIcons.infinity,
                          size: 24,
                          color: Colors.green,
                        ),
                        const SizedBox(
                          width: 5,
                        ),
                        Text(
                          "Piro Kodars",
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w800,
                              color: Colors.black),
                        )
                      ],
                    )
                  ],
                ),
              ))
            ],
          ),
        )));
  }
}
