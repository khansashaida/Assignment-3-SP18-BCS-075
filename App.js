import React, { useState , useEffect, useLayoutEffect} from 'react';
import { Text, View, StyleSheet, TextInput, TextInputComponent, ScrollView, TouchableOpacity, Button } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 function homescreen({ navigation, route }){

   const history = [
    {key: Math.random().toString(), op: 100, dsc : 10, fp: 10}
    ]

  const [orignalprice, setoriginalprice] = useState('')
  const [discount, setdiscount] = useState('')
  const [finalprice, setfinalprice] = useState('')
  const [saving, setsaving] = useState('')
  const [historylist, sethistorylist] = useState([])

  const calculatefp =(e)=>{
    setfinalprice(orignalprice * (discount/100))
    setsaving(orignalprice - finalprice)
  }

  function savecalculation(){
    if (!orignalprice.trim() || !discount.trim()) {
      return;
    }
    else{
      sethistorylist([
                ...historylist,
                {key: Math.random().toString(), op: orignalprice, dsc: discount, fp: finalprice}
                ])
      setoriginalprice('')
      setdiscount('')
    }
  }

  const removeItem =(itemkey)=>{
    sethistorylist(list => historylist.filter(item => item.key != itemkey));
  }

  const updateop = (e) =>{
    if(e >= 0){
    setoriginalprice(e)
    calculatefp(e)}
    else{
      alert("Postive number only");
    }
  }

  const updatedsc = (e) =>{
    if(e <= 100){
    setdiscount(e)
    calculatefp(e)}
    else{
      alert("Discount should be less then 100");
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button  color='#cd00cd' title = "History"  onPress={() =>
          navigation.navigate('History',{
            historydata: historylist 
          })
        } ></Button>
      ),
    })
  })


  return(
      <View style={styles.container}>
      <View style={{justifyContent:'center', backgroundColor:'#800080', width : '100%', alignSelf:'flex-start'}}>
      <Text style={{alignSelf:'center', fontWeight:'bold',fontSize:25, color:'#ff0f39'}}>DISCOUNT APP</Text>
      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>
      </View>
      <View>
        <View>
          <Text style={{fontWeight:'bold', alignSelf:'center'}}>Original Price:     </Text>
        </View>
        <View>
          <TextInput style={styles.input}
          placeholder='Number should be positive'
          keyboardType = 'numeric'
          value={orignalprice}
          onChangeText={(val) => {updateop(val)}}
          ></TextInput>
        </View>
      </View>

      <View >
        <View>
          <Text style={{fontWeight:'bold', alignSelf:'center'}}>Discount %:         </Text>
        </View>
        <View>
          <TextInput 
          style={styles.input}
          placeholder='100 is the max discount'
          keyboardType = 'numeric'
          value={discount}
          onChangeText={(val) => {updatedsc(val)}}
          ></TextInput>
        </View>
      </View>
      <Text>{"\n"}</Text>
     
      <TouchableOpacity onPress={savecalculation} >
      <View style={styles.buttonsave}>
      <Text style={{color:'white'}}>SAVE</Text>
      </View>
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      
      <Text>{"\n"}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{textAlign: "center", fontSize: 20}}>You Save :  {finalprice}</Text>
      <Text style={{textAlign: "center", fontSize: 20}}> Final Price :  {saving}</Text>
      </View>
      <Text>{"\n"}</Text>
      
      </View>
    );
  }

function historyscreen({ navigation, route }){


  const {historydata} = route.params;
  const [historylist,sethistorylist] = useState(historydata)
  const [chack,setchack] = useState(0)
  const removeItem =(itemkey)=>{
    sethistorylist(list => historylist.filter(item => item.key != itemkey));
  }
  function clearhistory(){
    sethistorylist([])
  }
   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title = "Clear"  onPress={clearhistory} color='#800080'></Button>
      ),
    })
  })
   return(
     <View style={styles.container}>
     
     <Text style={{alignSelf: 'center', fontWeight:'bold'}}>Original          Discount%         You Save</Text>
     <ScrollView style={styles.scrollview}>
      {historylist.map((item) =>
      <TouchableOpacity
      key={item.key}
      activeOpacity= {0.5}
      >
      <View
      style={styles.scrollViewItem}
      >
      <Text style={{color:'white'}}>{item.op}</Text>
      <Text  style={{color:'white'}}>{item.dsc}</Text>
      <Text  style={{color:'white'}}>{item.fp}</Text>
      
      </View>
      </TouchableOpacity>
      )}
    </ScrollView>
     </View>
   )
 }

export default function App() {

  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Home" component={homescreen} 
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
                title="HISTORY"
                color="#00cc00"
              />
            ),
          })}/>
    <Stack.Screen name="History" component={historyscreen}
    options={({ navigation, route }) => ({
            headerRight:()=> (
              <Button
              
                title="Clear"
                color="#800080"
              />
            ),
          })} />
    </Stack.Navigator>
    </NavigationContainer>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'white'
  },
  input:{
    alignSelf:"center",
    padding: 8,
    width: 200,
    margin: 1,
    justifyContent: 'center',
    
  },
  scrollViewItem:{
    borderWidth: 2,
    width : '100%',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    justifyContent: "space-between",
    flexDirection : 'row',
    backgroundColor:'#800080'
    
  },
  scrollview:{
    width : '100%',
  },
  cross:{
    fontWeight:'bold',
    color:'red'
  },
  crossview:{
    backgroundColor:'black',
    borderRadius: 50,padding : 5, width:20,
    justifyContent: 'center',
    alignItems:"center"
  },
  buttonsave:{
    width : '100%',
    alignSelf: "center",
    padding: 10,
    margin: 5,
    justifyContent: "center",
    flexDirection : 'row',
    backgroundColor: '#800080',
    borderRadius:50
  }
}
)