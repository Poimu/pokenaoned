package com.pokenantes.dao;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pokenantes.dtos.Article;
import com.pokenantes.dtos.Fournisseur;

/* @Repository indique qu'il s'agit d'un objet ayant pour vocation la gestion des données : Un DAO. */
@Repository
/*
 * @Transactional indique que l'on va effectuer des manips avec la base de
 * données.
 */
@Transactional(readOnly = true)
public class Dao {

	/*
	 * Une session factory indique que l'on va effectuer des transactions : on
	 * ouvre la porte de la base de données en ouvrant la sessionFactory.
	 */
	@Autowired
	private SessionFactory sessionFactory;

	/* Fonction de validation du nom & du mot de passe */
	public boolean validCredentials(String name, String password) {
		Session session = sessionFactory.openSession();
		Query query = session
				.createQuery("FROM Utilisateur where nomutilisateur= :name and motdepasseutilisateur= :password");
		query.setParameter("name", name);
		query.setParameter("password", password);
		if (query.uniqueResult() != null) {
			session.close();
			return true;
		}
		session.close();
		return false;

	}

	@SuppressWarnings("unchecked")
	public ArrayList<Article> fetchProducts() {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("FROM Article");
		ArrayList<Article> productsList = (ArrayList<Article>) query.list();
		session.close();
		return productsList;
	}

	@Transactional(readOnly = false)
	public void deleteProduct(int productId) {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("delete Article where idarticle = :productId");
		query.setParameter("productId", productId);
		int result = query.executeUpdate();
		if (result > 0) {
			System.out.println("Product removed");
		}
		session.close();
	}

	@Transactional(readOnly = false)
	public void editQuantity(int stockValue, int productId) {
		Session session = sessionFactory.openSession();
		Query query = session
				.createQuery("update Article set quantitearticle = :stockValue where idarticle = :productId ");
		query.setParameter("productId", productId);
		query.setParameter("stockValue", stockValue);
		query.executeUpdate();
		session.close();
	}

	@Transactional(readOnly = false)
	public Fournisseur addSupplier(Fournisseur fournisseur) {
		Session session = sessionFactory.openSession();
		fournisseur.setIdfournisseur(null);
		session.save(fournisseur);
		session.close();
		return fournisseur;
	}

	@Transactional(readOnly = false)
	public Article addProduct(Article article) {
		Session session = sessionFactory.openSession();
		session.save(article);
		session.close();
		return article;
	}

	public Fournisseur getSupplier(int idfournisseur) {
		Session session = sessionFactory.openSession();
		Query query = session.createQuery("FROM Fournisseur where idfournisseur = :idfournisseur");
		query.setParameter("idfournisseur", idfournisseur);
		return (Fournisseur) query.uniqueResult();
	}

}
