//packages
import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:http/http.dart' as http;
//screens
//widgets
//providers
import '../providers/gym_data.dart';

class GymDetail extends StatefulWidget {
  static const route = '/GymDetail';
  @override
  State<GymDetail> createState() => _GymDetailState();
}

class _GymDetailState extends State<GymDetail> {
  var _razorpay = Razorpay();
  AnimationController? animationController;

  Animation<double>? animation;

  final double infoHeight = 364.0;
  @override
  void initState() {
    // TODO: implement initState
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    super.initState();
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) {
    showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
              title: Text('Subscribed'),
              content: Text('Gym Subscribed Successfully'),
              actions: <Widget>[
                TextButton(
                  child: Text('ok'),
                  onPressed: () {
                    Navigator.of(ctx).pop();
                    Navigator.of(ctx).pushNamed('/');
                    final Map<String, Object> obj = ModalRoute.of(context)
                        ?.settings
                        .arguments as Map<String, Object>;
                    final GymListData gymdata = obj['gymdata'] as GymListData;
                    gymdata.subscribe(gymdata);
                  },
                ),
              ],
            ));
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    // Do something when payment fails
    showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
              title: Text(' Not Subscribed'),
              content: Text('Payment Failed'),
              actions: <Widget>[
                TextButton(
                  child: Text('ok'),
                  onPressed: () {
                    Navigator.of(ctx).pop();
                    Navigator.of(ctx).pushNamed('/');
                  },
                ),
                TextButton(
                  child: Text('retry'),
                  onPressed: () {
                    final Map<String, Object> obj = ModalRoute.of(context)
                        ?.settings
                        .arguments as Map<String, Object>;
                    final GymListData gymdata = obj['gymdata'] as GymListData;
                    doPayment(gymdata);
                  },
                ),
              ],
            ));
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    // Do something when an external wallet is selected
  }

  @override
  void dispose() {
    _razorpay.clear(); // Removes all listeners
    // TODO: implement dispose
    super.dispose();
  }

  void doPayment(GymListData gym) {
    var options = {
      'key': 'rzp_test_s1HlMXl4TJpW2C',
      'amount':
          (gym.perNight * 100).toString(), //in the smallest currency sub-unit.
      'name': gym.titleTxt, // Generate order_id using Orders API
      'description': 'Gym Subscription',
      'timeout': 300, // in seconds
      'prefill': {'contact': '8787878787', 'email': 'demo@gmail.com'}
    };
    _razorpay.open(options);
  }

  @override
  Widget build(BuildContext context) {
    final double tempHeight = MediaQuery.of(context).size.height -
        (MediaQuery.of(context).size.width / 1.2) +
        24.0;
    final Map<String, Object> obj =
        ModalRoute.of(context)?.settings.arguments as Map<String, Object>;
    final GymListData gymdata = obj['gymdata'] as GymListData;
    return Scaffold(
      body: Stack(
        children: <Widget>[
          Column(
            children: <Widget>[
              AspectRatio(
                aspectRatio: 1.2,
                child: Image.network(
                  gymdata.imagePath,
                  fit: BoxFit.cover,
                ),
              ),
            ],
          ),
          Positioned(
            top: (MediaQuery.of(context).size.width / 1.2) - 24.0,
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              decoration: BoxDecoration(
                color: Color(0xFFFFFFFF),
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(32.0),
                    topRight: Radius.circular(32.0)),
                boxShadow: <BoxShadow>[
                  BoxShadow(
                      color: Color(0xFF3A5160).withOpacity(0.2),
                      offset: const Offset(1.1, 1.1),
                      blurRadius: 10.0),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 8, right: 8),
                child: SingleChildScrollView(
                  child: Container(
                    constraints: BoxConstraints(
                        minHeight: infoHeight,
                        maxHeight:
                            tempHeight > infoHeight ? tempHeight : infoHeight),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.only(
                              top: 32.0, left: 18, right: 16),
                          child: Text(
                            gymdata.titleTxt,
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 22,
                              letterSpacing: 0.27,
                              color: Color(0xFF17262A),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(
                              left: 16, right: 16, bottom: 8, top: 16),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: <Widget>[
                              Text(
                                '₹${gymdata.perNight}',
                                textAlign: TextAlign.left,
                                style: TextStyle(
                                  fontWeight: FontWeight.w200,
                                  fontSize: 22,
                                  letterSpacing: 0.27,
                                  color: Color(0xFF00B6F0),
                                ),
                              ),
                              Container(
                                child: Row(
                                  children: <Widget>[
                                    Text(
                                      '4.3',
                                      textAlign: TextAlign.left,
                                      style: TextStyle(
                                        fontWeight: FontWeight.w200,
                                        fontSize: 22,
                                        letterSpacing: 0.27,
                                        color: Color(0xFF3A5160),
                                      ),
                                    ),
                                    Icon(
                                      Icons.star,
                                      color: Color(0xFF00B6F0),
                                      size: 24,
                                    ),
                                  ],
                                ),
                              )
                            ],
                          ),
                        ),
                        AnimatedOpacity(
                          duration: const Duration(milliseconds: 500),
                          opacity: 1,
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: Row(
                              children: <Widget>[
                                // getTimeBoxUI('24', 'Classe'),
                                getTimeBoxUI('2hours', 'Time'),
                                // getTimeBoxUI('24', 'Seat'),
                              ],
                            ),
                          ),
                        ),
                        Expanded(
                          child: AnimatedOpacity(
                            duration: const Duration(milliseconds: 500),
                            opacity: 1,
                            child: Padding(
                              padding: const EdgeInsets.only(
                                  left: 16, right: 16, top: 8, bottom: 8),
                              child: Text(
                                gymdata.subTxt,
                                textAlign: TextAlign.justify,
                                style: TextStyle(
                                  fontWeight: FontWeight.w200,
                                  fontSize: 14,
                                  letterSpacing: 0.27,
                                  color: Color(0xFF3A5160),
                                ),
                                maxLines: 3,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                        ),
                        AnimatedOpacity(
                          duration: const Duration(milliseconds: 500),
                          opacity: 1,
                          child: Padding(
                            padding: const EdgeInsets.only(
                                left: 16, bottom: 16, right: 16),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: <Widget>[
                                Expanded(
                                  child: InkWell(
                                    // onTap: () {
                                    //   showModalBottomSheet(
                                    //       context: context,
                                    //       builder: (context) {
                                    //         return Container(
                                    //           height: 200,
                                    //           child: Column(
                                    //             children: [
                                    //               Text("Select Date"),
                                    //               Text("Select Time"),
                                    //               Text("Select Duration"),
                                    //               ElevatedButton(
                                    //                   onPressed: () {
                                    //                     Navigator.of(context)
                                    //                         .pop();
                                    //                   },
                                    //                   child: Text("Book Now"))
                                    //             ],
                                    //           ),
                                    //         );
                                    //       });
                                    // },

                                    //
                                    onTap: () => showDialog(
                                      context: context,
                                      builder: (ctx) => AlertDialog(
                                        title: Text('Subscribe'),
                                        content: Text(
                                            'Are you sure you want to subscribe?'),
                                        actions: <Widget>[
                                          TextButton(
                                            child: Text('NO'),
                                            onPressed: () {
                                              Navigator.of(ctx).pop();
                                            },
                                          ),
                                          TextButton(
                                            child: Text('YES'),
                                            onPressed: () {
                                              Navigator.of(ctx).pop();
                                              doPayment(gymdata);
                                            },
                                          ),
                                        ],
                                      ),
                                    ),
                                    child: Container(
                                      height: 48,
                                      decoration: BoxDecoration(
                                        color: Color(0xFF00B6F0),
                                        borderRadius: const BorderRadius.all(
                                          Radius.circular(16.0),
                                        ),
                                        boxShadow: <BoxShadow>[
                                          BoxShadow(
                                              color: Color(0xFF00B6F0)
                                                  .withOpacity(0.5),
                                              offset: const Offset(1.1, 1.1),
                                              blurRadius: 10.0),
                                        ],
                                      ),
                                      child: Center(
                                        child: Text(
                                          'Subscribe',
                                          textAlign: TextAlign.left,
                                          style: TextStyle(
                                            fontWeight: FontWeight.w600,
                                            fontSize: 18,
                                            letterSpacing: 0.0,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).padding.bottom,
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            top: (MediaQuery.of(context).size.width / 1.2) - 24.0 - 35,
            right: 35,
            child: Card(
              color: Color(0xFF00B6F1),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(50.0)),
              elevation: 10.0,
              child: Container(
                width: 60,
                height: 60,
                child: Center(
                  child: IconButton(
                    icon: Icon(
                      Icons.favorite,
                      color: Color(0xFFFFFFFF),
                      size: 30,
                    ),
                    onPressed: () {
                      gymdata.toggleFavorite();
                      ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      gymdata.isFav
                          ? ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                duration: Duration(seconds: 2),
                                backgroundColor: Colors.white,
                                content: Text(
                                  'Added to Favorites',
                                  style: TextStyle(
                                      color: Theme.of(context).primaryColor),
                                ),
                                action: SnackBarAction(
                                  label: 'UNDO',
                                  onPressed: () {
                                    gymdata.toggleFavorite();
                                  },
                                ),
                              ),
                            )
                          : ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Removed from Favorites'),
                                duration: Duration(seconds: 2),
                                action: SnackBarAction(
                                  label: 'UNDO',
                                  onPressed: () {
                                    gymdata.toggleFavorite();
                                  },
                                ),
                              ),
                            );
                    },
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
            child: SizedBox(
              width: AppBar().preferredSize.height,
              height: AppBar().preferredSize.height,
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius:
                      BorderRadius.circular(AppBar().preferredSize.height),
                  child: Icon(
                    Icons.arrow_back_ios,
                    color: Color(0xFF213333),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget getTimeBoxUI(String text1, String txt2) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
          color: Color(0xFFFFFFFF),
          borderRadius: const BorderRadius.all(Radius.circular(16.0)),
          boxShadow: <BoxShadow>[
            BoxShadow(
                color: Color(0xFF3A5160).withOpacity(0.2),
                offset: const Offset(1.1, 1.1),
                blurRadius: 8.0),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.only(
              left: 18.0, right: 18.0, top: 12.0, bottom: 12.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Text(
                text1,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                  letterSpacing: 0.27,
                  color: Color(0xFF00B6F0),
                ),
              ),
              Text(
                txt2,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontWeight: FontWeight.w200,
                  fontSize: 14,
                  letterSpacing: 0.27,
                  color: Color(0xFF3A5160),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
