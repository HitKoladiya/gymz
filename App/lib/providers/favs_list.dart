//packages
//screens
//widgets
//providers
import './gym_data.dart';

List<GymListData> favs = [];

void addFav(GymListData gym) {
  favs.add(gym);
}

void removeFav(GymListData gym) {
  favs.remove(gym);
}
