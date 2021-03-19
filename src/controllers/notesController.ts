class NotesController {
  public notes = async (req: any, res: any, next: any) => {
    
    res.json({
      token: null,
    });

  }
}

export = new NotesController();