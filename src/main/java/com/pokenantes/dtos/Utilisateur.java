package com.pokenantes.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//On précise que c'est exploité pour un corrélation dans une base de données
@Entity
// On précise la table concernée
@Table(name = "UTILISATEURS")
public class Utilisateur {

	/*
	 * Les attributs du DTO corrélés à leur équivalent dans la base de données
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idUtilisateur;
	@Column(name = "NOMUTILISATEUR")
	private String nomutilisateur;
	@Column(name = "MOTDEPASSEUTILISATEUR")
	private String motdepasseutilisateur;

	/* Un constructeur vide & un qui prend les attributs noms/password */
	public Utilisateur() {
	}

	public Utilisateur(String name, String password) {
		this.nomutilisateur = name;
		this.motdepasseutilisateur = password;
	}

	public Integer getIdUtilisateur() {
		return idUtilisateur;
	}

	public String getNomutilisateur() {
		return nomutilisateur;
	}

	public String getMotdepasseutilisateur() {
		return motdepasseutilisateur;
	}

}
