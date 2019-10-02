curl -X POST -H 'Content-type:application/json' --data-binary '{
  "add-field":{
"name":"tekst"
,"type":"text_general"
,"multiValued":true
,"indexed":true
,"stored":true}
}' http://localhost:8983/solr/sd/schema
