import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icons: {
    color: '#e8e8e8',
  },
  headerBgcolor: {
    backgroundColor: '#1e90ff',
    color: '#e8e8e8',
    fontSize: 23
  },
  footer: {
    backgroundColor: '#1e90ff'
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '84%',
    marginBottom: 10,
    borderRadius: 5
  },
  inputMessage: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '84%',
    marginBottom: 0,
    borderRadius: 20,
    backgroundColor: 'whitesmoke'
  },
  header: {
    fontSize: 50,
    margin: 20,
    color: 'blue'
  },
  buttoncircle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50
  },
  button: {
    borderWidth: 1,
    width: 125,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  countText: {
    color: '#FF00FF',
    fontSize: 35
  },
  image: {
    width: 120,
    height: 54,
    resizeMode: 'stretch'
  },
  timer: {
    fontSize: 20,
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center'
  },
  textborder: {
    textAlign: "right",
    width: 150,
    borderWidth: 1,
    color: '#003399',
    backgroundColor: '#dcdcdc',
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#9c9c9c',
    paddingRight: 15
  },
  trigger: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    width: 50,
    height: 30,
    color: '#e8e8e8'
  },
  image_logo: {
    width: 130,
    height: 130,
    resizeMode: 'stretch'
  },
  image2: {
    width: 50
  },
  image3: {
    width: 40,
    height: 40,
    resizeMode: 'stretch'
  },
  textDrawer: {
    fontSize: 20,
    color: '#003399',
  },
  headerRate: {
    fontSize: 25,
    padding: 3
  },
  textRate: {
    fontSize: 20,
    padding: 3,
    paddingRight: 50,
    paddingLeft: 50
  },
  bodyRate: {
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
    borderColor: '#9c9c9c'
  }
});

export default styles;