{
	"info": {
		"_postman_id": "f319e83c-09d2-46b0-ba17-84bc12e3d82b",
		"name": "TEST",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "TestRequest",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text",
						"disabled": true
					},
					{
						"key": "Authorization",
						"value": "",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\"nth\":1000000}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://functionprojectfibonnaci.azurewebsites.net/api/Fibonacci",
					"protocol": "https",
					"host": [
						"functionprojectfibonnacci",
						"azurewebsites",
						"net"
					],
					"path": [
						"api",
						"Fibonacci"
					],
					"query": [
						{
							"key": "app",
							"value": "3",
							"disabled": true
						}
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}