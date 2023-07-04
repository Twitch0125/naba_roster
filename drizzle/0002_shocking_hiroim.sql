CREATE VIRTUAL TABLE `players_fts` USING fts5(
	`last_name`,
	`first_name`,
	`team_name`,
	`id`
);
