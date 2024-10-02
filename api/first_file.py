from flask import Flask, request, jsonify
import mysql.connector as mc
import random
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, origins=['*'])

CORS(app)
def get_data_from_db():
    try:
        conn = mc.connect(host='localhost', database='DBGestionStock', user='root', password='')  # Replace with secure credentials
        cursor = conn.cursor()
        req = 'SELECT nom, SUM(quantite) AS quantite_totale, code FROM product GROUP BY nom'
        cursor.execute(req)

        ninjalist = cursor.fetchall()
        return ninjalist
    except mc.Error as error:
        print(error)
        return []  # Or handle the error differently
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/')
def home():
    return 'welcome to our api '

@app.route('/api/data')
def get_data():
    data = get_data_from_db()
    return jsonify(data)





#inserer les donnees dans ma bd
@app.route('/api/insert', methods=['POST'])
@cross_origin(origin='http://localhost:3000/Entrer')
def receive_data():
    data = request.get_json()
    mydb = mc.connect(
    host="localhost",
    user="root",
    password="",
    database="DBGestionStock"
    ) 
    try:
        mycursor = mydb.cursor()
        for i in range(len(data)):
            uuid = ''
            id=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
            list = random.sample(id, 20)
            for letter in list:
                uuid += letter
            
            requet = "SELECT quantite FROM product WHERE nom='"+data[0]['nom']+"' AND code ='"+data[0]['code']+"'"
            mycursor.execute(requet)
            cc = mycursor.fetchall()
            if cc:
                # print(cc[0][0])

                requet2 = "UPDATE product SET quantite = quantite + '"+data[0]['qte']+"' WHERE nom = '"+data[0]['nom']+"' AND code = '"+data[0]['code']+"'"
                mycursor.execute(requet2)
                mydb.commit()
            else:
                sql = "INSERT INTO product (id, nom, quantite, code, date, prixU, nomFornisseur) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                val = (
                    uuid,  
                    data[i]['nom'],
                    data[i]['qte'],
                    data[i]['code'],
                    data[i]['cutDate'], 
                    data[i]['prixU'],
                    data[i]['nomF']
                )
                mycursor.execute(sql, val)
                mydb.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        return jsonify({'error': str(error)}), 500




#afficher les donnees specifique
@app.route('/api/detail', methods=['POST'])
def receive_uuid():
    uuid = request.get_json()
    print('uuid: ',uuid)
    try:
        conn = mc.connect(host='localhost', database='DBGestionStock', user='root', password='')  # Replace with secure credentials
        cursor = conn.cursor()
        req = "SELECT id, nom, SUM(quantite) AS quantite, code, date, prixU, nomFornisseur FROM product WHERE nom = '"+str(uuid)+"' GROUP BY code    "
        cursor.execute(req)
        ninjalist = cursor.fetchall()
        print(ninjalist)
        return ninjalist
    except mc.Error as error:
        print(error)
        return []
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()





# enregistrer les ventes
@app.route('/api/vente',methods=['POST'])
def save_sell():
    data = request.get_json()
    try:

        conn = mc.connect(
            host='localhost',
            database='DBGestionStock',
            user='root',
            password=''
        )
        mycursor = conn.cursor()
        uuid = ''
        id=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
        list = random.sample(id, 20)

        for letter in list:
            uuid += letter
        
        requet = "SELECT sum(quantite) AS quantite FROM product WHERE nom = '"+data[0]['nom']+"' AND code='"+data[0]['code']+"'"
        mycursor.execute(requet)
        qte = mycursor.fetchall()
        print('qqqqq ',qte)

        if int(data[0]['qte'])<=qte[0][0]:
            requet1 = 'INSERT INTO vente(id, nom, quantite, code, date, prixU) VALUE (%s,%s,%s,%s,%s,%s)'
            value = (
                uuid,
                data[0]['nom'],
                data[0]['qte'],
                data[0]['code'],
                data[0]['cutDate'], 
                data[0]['prixU']
            )
            mycursor.execute(requet1, value)

            requet2 = "UPDATE product SET quantite = quantite - '"+data[0]['qte']+"' WHERE nom = '"+data[0]['nom']+"' AND code = '"+data[0]['code']+"'"
            mycursor.execute(requet2)
      
            conn.commit()
            return jsonify({'message': 'Données insérées avec succès'}), 201
        else:
            return jsonify({'message': 'la quantiter est superieur a celle en stock'}), 501
        
    except mc.Error as error:
        print(error)
        return []





#recuperer les vente du filtre
@app.route('/api/vente/day', methods=['POST'])
def get_sell():
    data=request.get_json()
    print('data: ',data)
    try:
        conn = mc.connect(host='localhost', database='DBGestionStock', user='root', password='')  # Replace with secure credentials
        cursor = conn.cursor()
        req = "SELECT code, nom, prixU, date, quantite FROM vente WHERE date LIKE '%" + data['dateFilter']+"%' ORDER BY date ASC"
        # SELECT code, nom, prixU, date, quantite FROM vente WHERE date = '"+str(data)+"' ORDER BY date ASC"
        cursor.execute(req)
        ninjalist = cursor.fetchall()
        print('ninja',ninjalist)
        return ninjalist
    except mc.Error as error:
        print(error)
        return []
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()




#recuperer les commandes
@app.route('/api/recuperer/commande')
def get_commande():
    try:
        conn = mc.connect(host='localhost', database='DBGestionStock', user='root', password='')  # Replace with secure credentials
        cursor = conn.cursor()
        req = "SELECT nom, quantite, id FROM commande"
        cursor.execute(req)
        ninjalist = cursor.fetchall()
        print(ninjalist)
        return ninjalist
    except mc.Error as error:
        print(error)
        return []
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()





 
# ajouter les commandes
@app.route('/api/commande',methods=['POST'])
def save_commande():
    data=request.get_json()
    print('dataaaa: ', data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor=conn.cursor()
        uuid = ''
        id=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
        list = random.sample(id, 20)

        for letter in list:
            uuid += letter

        sql= 'INSERT INTO commande(id, nom, quantite) VALUE (%s,%s,%s)'
        value = (
            uuid,
            data[0][0],
            data[0][1]
        )

        mycursor.execute(sql, value)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)





#suprimer une commande
@app.route('/api/suprimer/commande', methods=['POST'])
def delete_commande():
    data=request.get_json()
    print(data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor=conn.cursor()
        sql="DELETE FROM `commande` WHERE id = '"+data+"'"
        mycursor.execute(sql)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500





#modifier une commande
@app.route('/api/update/commande', methods=['POST'])
def update_commande():
    data=request.get_json()
    print(data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor=conn.cursor()
        sql="UPDATE `commande` SET `nom`='"+data[1]+"',`quantite`='"+data[2]+"' WHERE id='"+data[0]+"'"
        mycursor.execute(sql)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500








#enregistrer les prets
# enregistrer les nouveau pret
@app.route('/api/pret/enregistrer', methods=['POST'])
def save_loan():
    data=request.get_json()
    print(data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        uuid = ''
        id=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
        list = random.sample(id, 20)
        print('data ',data)
        for letter in list:
            uuid += letter
        delete = 'DELETE FROM `pret` WHERE quantite=0 AND nom_emprunteur="'+data[0]['nomE']+'"'
        mycursor.execute(delete)
        sql = 'INSERT INTO pret(id, nom_emprunteur, nom, quantite, prixU, date, code, prixT) VALUE(%s, %s, %s, %s, %s, %s, %s, %s)'
        value = (
            uuid,
            data[0]['nomE'],
            data[0]['nom'],
            data[0]['qte'],
            data[0]['prixU'],
            data[0]['cutDate'],
            data[0]['code'],
            data[0]['prixT']
        )

        mycursor.execute(sql, value)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500

# recuperrer les pret
@app.route('/api/pret/recuperer')
def get_loan():
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        sql='SELECT nom_emprunteur, SUM(prixT) AS prix_totale FROM pret GROUP BY nom_emprunteur'
        mycursor.execute(sql)
        pret=mycursor.fetchall()
        print(pret)
        return pret
    except mc.Error as error:
        print(error)

@app.route('/api/pret/recuperer/detail', methods=['POST'])
def get_uniq_loan():
    data= request.get_json()
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        sql="SELECT code, nom, quantite, prixU, date, prixT, avance FROM pret WHERE nom_emprunteur='"+str(data)+"'"
        mycursor.execute(sql)
        pret=mycursor.fetchall()
        print(pret)
        return pret
    except mc.Error as error:
        print(error)





#update un preteur
@app.route('/api/pret/update', methods=['POST'])
def updateLoan():
    data= request.get_json()
    print('update',data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        sql="UPDATE pret SET avance='"+data['avance']+"' WHERE nom='"+data['nom']+"' AND nom_emprunteur='"+data['nomE']+"'"
        mycursor.execute(sql)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500





#suprimer un preteur
@app.route('/api/pret/delete', methods=['POST'])
def deleteLoan():
    data= request.get_json()
    print(data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        sql="DELETE FROM pret WHERE nom='"+data['nom']+"' AND nom_emprunteur='"+data['nomE']+"'"
        mycursor.execute(sql)
        conn.commit()
        return jsonify({'message': 'Données insérées avec succès'}), 201
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500




@app.route('/api/pass', methods=['POST'])
def chekPass():
    data=request.get_json()
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        requet = 'SELECT nom, pass FROM authentification WHERE nom="'+data[0]['nom']+'" AND pass="'+data[0]['pass']+'"'
        mycursor.execute(requet)
        if len(mycursor.fetchall())>0:
            return jsonify({'message': 'donne envyer avec success'}), 200
        else:
            return jsonify({'message': 'donne envyer avec success'}), 201

    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500





@app.route('/api/analyse', methods=['POST'])
def analyse():
    data = request.get_json()
    print('dada', data)
    try:
        conn=mc.connect(host='localhost', database='DBGestionStock', user='root', password='')
        mycursor = conn.cursor()
        # requet = 'SELECT date, nom, code, quantite, prixU FROM vente ORDER BY date asc'
        requet='SELECT vente.date, vente.nom, vente.code, vente.quantite, vente.prixU, product.prixU FROM vente, product where product.nom=vente.nom and product.code=vente.code and vente.date like "%'+data['dateFilter']+'%" ORDER BY vente.date asc;'
        mycursor.execute(requet)
        element=mycursor.fetchall()
        print(element)
        return element
    except mc.Error as error:
        print(error)
        return jsonify({'error': str(error)}), 500
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)





#     CREATE PROCEDURE update_quantite(IN p_nom VARCHAR(50), IN p_code VARCHAR(50), IN p_quantite INT)
# BEGIN
#     DECLARE done INT DEFAULT FALSE;
#     DECLARE v_id INT;
#     DECLARE v_quantite_restante INT;
#     DECLARE cur CURSOR FOR SELECT id, quantite FROM ta_table WHERE nom = p_nom AND code = p_code;
#     DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

#     SET v_quantite_restante = p_quantite;

#     OPEN cur;
#     read_loop: LOOP
#         FETCH cur INTO v_id, quantite;
#         IF done THEN
#             LEAVE read_loop;
#         END IF;

#         IF quantite >= v_quantite_restante THEN
#             UPDATE ta_table SET quantite = quantite - v_quantite_restante WHERE id = v_id;
#             SET v_quantite_restante = 0;
#         ELSE
#             UPDATE ta_table SET quantite = 0 WHERE id = v_id;
#             SET v_quantite_restante = v_quantite_restante - quantite;
#         END IF;

#         IF v_quantite_restante = 0 THEN
#             LEAVE read_loop;
#         END IF;
#     END LOOP;
#     CLOSE cur;

#     -- Si il reste de la quantité, on insère un nouvel enregistrement
#     IF v_quantite_restante > 0 THEN
#         INSERT INTO ta_table (nom, code, quantite) VALUES (p_nom, p_code, v_quantite_restante);
#     END IF;
# END;