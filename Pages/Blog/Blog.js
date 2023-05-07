import { StyleSheet, Text, View, Image,TouchableOpacity,SafeAreaView,ImageBackground } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Blogs } from "../../Shared/Sharedlist";
import { Icon } from "react-native-elements";

export default function Blog({ route ,navigation}) {
  // console.log(route, "blogs");
  return (
    <ScrollView>
      <ImageBackground
        style={{ height: 250, width: "100%", resizeMode: "cover" }}
        source={{ uri: route.params.IMG }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            backgroundColor: "grey",
            opacity: 0.5,
            marginLeft: 10,
            marginTop: 35,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      <View>
        <Text style={{ padding: 25, fontSize: 20, fontWeight:"normal" }}>
          {route.params.Des}
        </Text>
      </View>
      <SafeAreaView style={styles.Carousel}>
        <View style={styles.wrap}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginLeft: 2 }}
          >
            { Blogs.map((e, index) => (
              <TouchableOpacity
                key={index}
              >
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={{
                    width: 170,
                    height: 170,
                    marginLeft: 10,
                    borderRadius: 5,
                    marginBottom:30,
                    resizeMode: "cover",
                  }}
                  source={{ uri: e.img }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    wrap: {
        width: 350,
        height: 150,
        marginLeft: 15,
      },

      Carousel: {
        marginTop: 20,
        backgroundColor: "#FFF",
        width: "100%",
      },
});


