import { Text, View } from "react-native";

export function Header() {
    return (
        <View style={{paddingTop:32, paddingBottom:16, alignItems:'center', backgroundColor:'#4d4d4d'}}>
            <Text style={{fontSize:32, color:'#fff'}}>Categorias</Text>
            <Text style={{color:'#fff'}}>Defina a sequencia que mais lhe agrada no topo</Text>
        </View>
    )
}