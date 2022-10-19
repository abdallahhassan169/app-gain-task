from flask import Flask 
import os
from flask import Flask,render_template, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS




app = Flask (__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)



class Links(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    web = db.Column(db.String(500), nullable=False)
    and_primary = db.Column(db.String(500), nullable=False)
    and_fallback = db.Column(db.String(500), nullable=False)
    ios_primary = db.Column(db.String(500), nullable=False)
    ios_fallback = db.Column(db.String(500), nullable=False)


db.create_all()

#google = Links(slug='goo',
               #web='google',
               #and_primary='google.and',
               #and_fallback='google.and',
               #ios_primary='google.ios',ios_fallback='google.ios')
#db.session.add(google)
#db.session.commit() #/



@app.route('/')
def all_links():
     link=Links.query.all()

    
     results = [
             {
                 "slug":i.slug  , "web":i.web , "android":{"and_primary":i.and_primary,
                       "and_fallback":i.and_fallback} ,"ios":{"ios_primary":i.ios_primary,
                       "ios_fallback":i.ios_fallback
             } }for i in link]  
                                                        
     if len(results) == 0 :
         return jsonify( {"msg":"success","data":"NO data to show"} )
     else:
         return jsonify( results )


@app.route('/create/', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        slug = request.form['slug']
        web = request.form['web']
        and_primary = request.form['and_primary']
        and_fallback = request.form['and_fallback'] 
        ios_primary = request.form['ios_primary']
        ios_fallback= request.form['ios_fallback']

        link = Links(slug=slug,web=web, 
                     and_primary=and_primary,and_fallback=and_fallback
                     ,ios_primary=ios_primary,ios_fallback=ios_fallback)
        db.session.add(link)
        db.session.commit()
        return jsonify({"msg":"created","data":str(link.slug)})


@app.route("/update/<string:slug>", methods=["POST"])
def link_update(slug):
     link = Links.query.filter_by(slug=slug).one()     
   
 
         
     if request.form['web']:
         web = request.form['web']
         link.web=web

     if request.form['and_primary']:
         and_primary = request.form['and_primary']
         link.and_primary=and_primary

     if request.form['and_fallback']:
         and_fallback = request.form['and_fallback']
         link.and_fallback=and_fallback

     if request.form['ios_primary']:
         ios_primary = request.form['ios_primary']
         link.ios_primary=ios_primary

     if request.form['ios_fallback']:
         ios_fallback = request.form['ios_fallback']
         link.ios_fallback=ios_fallback

     
    

     db.session.commit()
     
     
     return jsonify({'msg':"updated","slug":str(link.slug)})




if __name__ == '__main__':
    app.run(debug=True)