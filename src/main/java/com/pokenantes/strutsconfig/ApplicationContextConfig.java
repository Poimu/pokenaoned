package com.pokenantes.strutsconfig;

import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;

import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.Article;
import com.pokenantes.dtos.Fournisseur;
import com.pokenantes.dtos.Utilisateur;

@Configuration
@ComponentScan("com.pokenantes")
public class ApplicationContextConfig {

	@Bean(name = "dao")
	public Dao getDao() {
		return new Dao();
	}

	@Bean(name = "utilisateur")
	public Utilisateur getUtilisateur() {
		return new Utilisateur();
	}

	@Bean(name = "article")
	public Article getArticle() {
		return new Article();
	}

	@Bean(name = "fournisseur")
	public Fournisseur getFournisseur() {
		return new Fournisseur();
	}

	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("org.postgresql.Driver");
		dataSource.setUrl("jdbc:postgresql://localhost/pokenantes");
		dataSource.setUsername("pokenantes");
		dataSource.setPassword("1");

		return dataSource;
	}

	@Bean
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(dataSource());
		sessionFactory.setPackagesToScan(new String[] { "com.pokenantes" });

		sessionFactory.setHibernateProperties(hibernateProperties());
		return sessionFactory;
	}

	Properties hibernateProperties() {
		return new Properties() {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			{
				setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
				setProperty(Environment.HBM2DDL_AUTO, "update");
				setProperty(Environment.SHOW_SQL, "false");
			}

		};

	}

	@Bean
	@Autowired
	public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
		HibernateTransactionManager txManager = new HibernateTransactionManager();
		txManager.setSessionFactory(sessionFactory);

		return txManager;
	}

}
