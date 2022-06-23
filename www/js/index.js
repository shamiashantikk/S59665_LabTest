var db;

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        
        var link1 = crossroads.addRoute('/index', function(){
            $.ajax({
                type: 'POST',
                url: "https://kerbau.odaje.biz/getstaff.php",
                data: data,
                cache: false.
                success: function(datareceived){
                    alert ("Successfull!");
                },
                error: function(){
                    alert ("Failed!");
                }
                }); 
        });

        var link1 = crossroads.addRoute("/maintable", function() {
            db.transaction(function(tx) {
                var len = results.row.length;
                alert (len + " ");

                if (len > 0) {
                    htmlText = "";
                    for (i = 0; i < len; i++) {
                        htmlText = htmlText + "<tr><td>" +(i+1)+ "</td><td>" +results.rows.item(i).name+ "</td><td>" +results.rows.item(i).phone+ "</td></tr>";                
                    }
                    $('#maintable tbody').html(htmlText);
                }
                else {
                    htmlText = "<tr><td>No data found! </td></tr>"
                    $('#maintable tbody').html(htmlText); 
                }
            });
            });
            $("#divStudentList").show();
        });


    $(function() {
        $("#divAddStdBtn").show();

        var link1 = crossroads.addRoute("/sqliteclick", function() {
            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM studentTbl;', [], function (tx, results) {
                var len = results.row.length;
                alert (len + " ");

                if (len > 0) {
                    htmlText = "";
                    for (i = 0; i < len; i++) {
                        htmlText = htmlText + "<tr><td>" +(i+1)+ "</td><td>" +results.rows.item(i).name+ "</td><td>" +results.rows.item(i).phone+ "</td></tr>";                
                    }
                    $('#tblStudent tbody').html(htmlText);
                }
                else {
                    htmlText = "<tr><td>No data found! </td></tr>"
                    $('#tblStudent tbody').html(htmlText); 
                }
            });
            });
            $("#divStudentList").show();
        });

        
        var link2 = crossroads.addRoute('viewstudent/id', function(id) {
            alert("Click on student id success!");

            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM studentTbl where id = ?', [id], function(tx, results) {
                    var len = results.row.length;
                    $("#studentidshow").val(results.row.item(0).nickname);
                    $("#studentnameshow").val(results.row.item(0).title);
                    $("#studentphoneshow").val(results.row.item(0).desc);
                });
            });

            $("#divStudentList").hide();
            $("#divFrmShowStudent").show();
        });

        var link3 = crossroads.addRoute('btnAddStudent', function(){
            $("#divFrmInputStudent").submit(function(e) {
                e.preventDefault();
                e.stopPropagation();

                var name = $("studentnameinput").val();
                var phone = $("studentphoneinput").val();

                db.transaction(function(tx){ 
                    var query = "insert into studentTbl (name, phone) values (?, ?)";
                    tx.executeSql(query,
                        [name,phone],
                        function (tx, results) {
                            alert("Data inserted!");
                        },
                        function (error) {
                            alert("Error, try again!");
                        }
                    );

                });
            });

            $("#divStudentList").hide();
            $("#divFrmShowStudent").hide();
            $("#divFrmInputStudent").show();
        });
        
        
        function parseHash(newHash, oldHash) {
            crossroads.parse(newHash);
        }


        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();


        

    });