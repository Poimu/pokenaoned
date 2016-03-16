package com.pokenantes.actions;

import java.util.ArrayList;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.Article;

//Réceptionne le POST trylogin
@Action("/trylogin")
// Gère les données reçues comme un objet JSON
@ParentPackage("json-default")
// Le renvoie sera un objet JSON et non pas une réorientation vers une page web.
@Result(type = "json", params = { "includeProperties",
		"msg, " // Renvoie de la liste des produits
				+ "productsList\\[\\d+\\]\\,"
				+ "productsList.idarticle,"
				+ "productsList.nomarticle"
				+ "productsList.couleurarticle,"
				+ "productsList.taillearticle,"
				+ "productsList.provenancearticle,"
				+ "productsList.etatarticle,"
				+ "productsList.typearticle,"
				+ "productsList.quantitearitcle,"
				+ "productsList.photoarticle,"
				+ "productsList.codearticle,"
				// Renvoie des détails fournisseurs
				+ "productsList\\[\\d+\\]\\.clefournisseur\\[\\d+\\]\\,"
				+ "productsList.clefournisseur.idfournisseur,"
				+ "productsList.clefournisseur.nomadressefournisseur,"
				+ "productsList.clefournisseur.typefournisseur,"
				+ "productsList.clefournisseur.numtelfournisseur,"
				+ "productsList.clefournisseur.nomfournisseur" })
public class Login extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String utilisateur;
	private String motdepasse;
	private ArrayList<Article> productsList;

	/* Les variables que l'on va renvoyer */
	private String msg;

	@Autowired
	private Dao dao;

	public String execute() {
		if (dao.validCredentials(utilisateur, motdepasse)) {
			System.out.println("USER FOUND");
			productsList = dao.fetchProducts();
			msg = "success";
		} else {
			System.out.println("ERREUR");
			msg = "error";
			return ActionSupport.ERROR;
		}
		return ActionSupport.SUCCESS;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(String utilisateur) {
		this.utilisateur = utilisateur;
	}

	public String getMotdepasse() {
		return motdepasse;
	}

	public void setMotdepasse(String motdepasse) {
		this.motdepasse = motdepasse;
	}

	public Dao getDao() {
		return dao;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public ArrayList<Article> getProductsList() {
		return productsList;
	}

	public void setProductsList(ArrayList<Article> productsList) {
		this.productsList = productsList;
	}

}