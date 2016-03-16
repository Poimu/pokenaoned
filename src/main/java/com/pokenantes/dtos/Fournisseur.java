package com.pokenantes.dtos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FOURNISSEURS")
public class Fournisseur {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idfournisseur;
	@Column(name = "NOMADRESSEFOURNISSEUR")
	private String nomadressefournisseur;
	@Column(name = "TYPEFOURNISSEUR")
	private String typefournisseur;
	@Column(name = "NUMTELFOURNISSEUR")
	private String numtelfournisseur;
	@Column(name = "NOMFOURNISSEUR")
	private String nomfournisseur;

	public Fournisseur() {
	}

	public Fournisseur(String nomadressefournisseur, String typefournisseur, String numtelfournisseur,
			String nomfournisseur) {
		this.nomadressefournisseur = nomadressefournisseur;
		this.typefournisseur = typefournisseur;
		this.numtelfournisseur = numtelfournisseur;
		this.nomfournisseur = nomfournisseur;
	}

	public Integer getIdfournisseur() {
		return idfournisseur;
	}

	public String getNomadressefournisseur() {
		return nomadressefournisseur;
	}

	public String getTypefournisseur() {
		return typefournisseur;
	}

	public String getNumtelfournisseur() {
		return numtelfournisseur;
	}

	public String getNomfournisseur() {
		return nomfournisseur;
	}

	public void setIdfournisseur(Integer idfournisseur) {
		this.idfournisseur = idfournisseur;
	}

	public void setNomadressefournisseur(String nomadressefournisseur) {
		this.nomadressefournisseur = nomadressefournisseur;
	}

	public void setTypefournisseur(String typefournisseur) {
		this.typefournisseur = typefournisseur;
	}

	public void setNumtelfournisseur(String numtelfournisseur) {
		this.numtelfournisseur = numtelfournisseur;
	}

	public void setNomfournisseur(String nomfournisseur) {
		this.nomfournisseur = nomfournisseur;
	}

}
