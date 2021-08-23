(function() {

  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyAsWj_qXiVaT_uKXuClot87k5wkmZgn30c",
    authDomain: "gtc-inventaire-depot.appspot.com",
    databaseURL: "https://gtc-inventaire-depot-default-rtdb.firebaseio.com",
    storageBucket: "gtc-inventaire-depot.appspot.com"
  };

  var mainApp = firebase.initializeApp(config);

  // Get a reference to the database service

  var database = mainApp.database();
  database.ref('depot').on('value', function(snapshot){
      if(snapshot.exists()){
          var content = '';
          // $('#ex-table').html("<tr id='tr'><th>Date:</th> <th>Matricule:</th> <th>GPS:</th> </table> ")
          // $('#ex-table').html("")
          $('#ex-table').html("<tr id='tr'><th>Date:</th> <th>Matricule:</th><th>Benne:</th> <th>Chauffeur:</th> <th>Category:</th> <th>Date acquisition:</th> <th>Mark:</th> <th>Cons:</th> <th>GPS:</th></tr>")
          snapshot.forEach(function(data){
              var val = data.val();
              content +='<tr>';
              content += '<td>' + val.date + '</td>';
              content += '<td>' + val.immat + '</td>';
              content += '<td>' + val.trailer_id + '</td>';
              content += '<td>' + val.driver_id + '</td>';
              content += '<td>' + val.category + '</td>';
              content += '<td>' + val.date_acquisition + '</td>';
              content += '<td>' + val.mark + '</td>';
              content += '<td>' + val.CONS_REELLE + '</td>';
              content += '<td>' + val.Type + '</td>';
              content += '</tr>';
          });
          $('#ex-table').append(content);
      }
  });
  // Get element time and total
  const preObject_time = document.getElementById('time');
  const preObject_total = document.getElementById('total');
  // Create references
  const total_Object = mainApp.database().ref("depot2").child('nrow');
  total_Object.on('value', snap => { preObject_total.innerText = JSON.stringify(snap.val(), null, 3); });
  const time_Object = mainApp.database().ref("depot2").child('time');
  time_Object.on('value', snap => { preObject_time.innerText = JSON.stringify(snap.val(), null, 3); });

  // gasoil 
  var config2 = {
    apiKey: "AIzaSyAY6Pg-ldBAgeAYAC6nmOtSXU8BWKSduKs",
    authDomain: "com.gtcgroup.gasoil",
    databaseURL: "https://gtc-gasoil-a6fb8-default-rtdb.firebaseio.com",
    storageBucket: "example-realtime-database.appspot.com"
  };
  var secondaryApp = firebase.initializeApp(config2,"secondary");

  // Get element
  const preObject_cuve1 = document.getElementById('cuve1');
  const preObject_cuve2 = document.getElementById('cuve2');
  const preObject_cuve3 = document.getElementById('totalgasoil');

  // Create references
  const CUVE1_Object = secondaryApp.database().ref("stock").child('CUVE1');
  CUVE1_Object.on('value', snap => { preObject_cuve1.innerText = JSON.stringify(Math.round(snap.val()*100)/100, null, 3); });

  // Create references
  const CUVE2_Object = secondaryApp.database().ref("stock").child('CUVE2');
  CUVE2_Object.on('value', snap => { preObject_cuve2.innerText = JSON.stringify(Math.round(snap.val()*100)/100, null, 3); });

  const total_Object2 = secondaryApp.database().ref("stock");
  total_Object2.on('value', snap => {
    var total = snap.child("CUVE1").val() + snap.child("CUVE2").val()+snap.child("CUVE4").val()+snap.child("CUVE5").val()+snap.child("CUVE6").val()+snap.child("CUVE7").val()
    preObject_cuve3.innerText =  Math.round(total*100)/100});




}());
