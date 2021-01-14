USE [BetterMusic]
GO
/****** Object:  Table [dbo].[MusicTable]    Script Date: 2021-01-05 13:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MusicTable](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ArtName] [varchar](50) NOT NULL,
	[SongName] [varchar](50) NOT NULL,
	[Duration] [nvarchar](50) NOT NULL,
	[AlbumName] [varchar](50) NOT NULL,
	[ArtLastName] [varchar](50) NULL,
	[SongPath] [nvarchar](50) NULL,
	[BackgroundPath] [nvarchar](50) NULL,
	[ArtistPath] [nvarchar](50) NULL,
	[AlbumPath] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLoginCred]    Script Date: 2021-01-05 13:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLoginCred](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_UserLoginCred] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[MusicTable] ON 

INSERT [dbo].[MusicTable] ([Id], [ArtName], [SongName], [Duration], [AlbumName], [ArtLastName], [SongPath], [BackgroundPath], [ArtistPath], [AlbumPath]) VALUES (1, N'XXXTentacion', N'Guardian Angel', N'2:37', N'SKINS', NULL, N'https://www.mboxdrive.com/XXXTENTATION.mp3', NULL, N'https://i.imgur.com/z7jauLX.jpg', N'https://i.imgur.com/E4sdEFW.jpg')
INSERT [dbo].[MusicTable] ([Id], [ArtName], [SongName], [Duration], [AlbumName], [ArtLastName], [SongPath], [BackgroundPath], [ArtistPath], [AlbumPath]) VALUES (2, N'Dennis Lloyd', N'Nevermind', N'2:36', N'Oeacen', NULL, NULL, NULL, N'https://i.imgur.com/78DiOEB.png', N'https://i.imgur.com/4rp7PsP.jpg')
INSERT [dbo].[MusicTable] ([Id], [ArtName], [SongName], [Duration], [AlbumName], [ArtLastName], [SongPath], [BackgroundPath], [ArtistPath], [AlbumPath]) VALUES (4, N'Sam', N'Need You', N'2:35', N'Spirit', N'Helix', N'NeedYou.wav', NULL, N'https://i.imgur.com/MppJanN.jpg', N'https://i.imgur.com/D0jkxVu.jpg')
INSERT [dbo].[MusicTable] ([Id], [ArtName], [SongName], [Duration], [AlbumName], [ArtLastName], [SongPath], [BackgroundPath], [ArtistPath], [AlbumPath]) VALUES (5, N'Eminem', N'MockingBird', N'2:26', N'The Show', NULL, N'https://www.mboxdrive.com/Eminem.mp3', NULL, N'https://i.imgur.com/r6IpmHI.jpg', N'https://i.imgur.com/UUXMppI.png')
INSERT [dbo].[MusicTable] ([Id], [ArtName], [SongName], [Duration], [AlbumName], [ArtLastName], [SongPath], [BackgroundPath], [ArtistPath], [AlbumPath]) VALUES (6, N'Imagine Dragons', N'Bad Liar', N'4:22', N'Liar', NULL, N'https://www.mboxdrive.com/BadLiar.mp3', NULL, N'https://i.imgur.com/2ycngdK.jpg', N'https://i.imgur.com/bxWTxFE.jpg')
SET IDENTITY_INSERT [dbo].[MusicTable] OFF
GO
SET IDENTITY_INSERT [dbo].[UserLoginCred] ON 

INSERT [dbo].[UserLoginCred] ([Id], [Username], [Password]) VALUES (1, N'123', N'123')
INSERT [dbo].[UserLoginCred] ([Id], [Username], [Password]) VALUES (2, N'Ganim', N'123')
INSERT [dbo].[UserLoginCred] ([Id], [Username], [Password]) VALUES (3, N'hej', N'hej')
INSERT [dbo].[UserLoginCred] ([Id], [Username], [Password]) VALUES (4, N'hej2', N'hej')
SET IDENTITY_INSERT [dbo].[UserLoginCred] OFF
GO
